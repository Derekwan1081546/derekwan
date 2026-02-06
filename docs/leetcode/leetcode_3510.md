
# Leetcode-3510. Minimum Pair Removal to Sort Array II
## 題目說明
給定一個陣列 `nums`，您可以執行下列操作任意次數：

選擇 `nums` 中和最小的相鄰元素對。如果存在多個這樣的元素對，則選擇最左邊的元素對。

將該元素對替換為它們的和。

傳回使陣列變成非遞減數組所需的最少操作次數。

如果數組中的每個元素都大於或等於其前一個元素（如果存在），則稱該數組為非遞減數組。

### 限制條件：
- `1 <= nums.length <= 50`
- `-1000 <= nums[i] <= 1000`

## 解題思路
目標是把一個整數陣列，透過「合併相鄰兩個數（相加）」的操作，變成一個非遞減的陣列，並且要求操作次數最少。

關鍵在於觀察什麼情況下一定還需要繼續操作。只要陣列中存在某個位置 i，使得左邊的數字大於右邊的數字，也就是出現 `nums[i] > nums[i+1]`，這個地方就破壞了非遞減的條件，代表目前的狀態是不合法的，勢必還要再做合併。因此整個流程的停止條件就是「不存在任何相鄰的逆序對」。

接下來是最重要的策略選擇：在還存在逆序對的情況下，應該合併哪一對相鄰元素，才能用最少的次數把問題解掉。這裡採用的是貪心策略，永遠選擇「相鄰和最小的一對」來合併。原因是，合併後的數值越小，越不容易對左右鄰居造成新的逆序關係，也就越不容易引發後續額外的合併需求。這個選擇可以把每次合併造成的副作用降到最低，從而保證整體操作次數最少。

在實作上，為了能夠高效地做這件事，整個陣列被視為一條「雙向串列」。每個元素都記錄它的前一個與後一個位置，這樣在合併某一對元素後，只需要調整局部的連結關係，而不需要真的搬動整個陣列。這讓每次合併都只影響常數個鄰居。

同時，所有相鄰元素的「和」都被放進一個有序集合中，集合會自動依照總和排序。這樣每一步都可以在對數時間內，直接拿到目前相鄰和最小的那一對來合併。

此外，程式會維護目前整個結構中還剩下多少個逆序對。初始化時先掃描一次，計算所有 `nums[i] > nums[i+1]` 的位置數量。之後每做一次合併，只需要針對合併點附近的幾個位置，更新逆序對的數量，而不需要重新掃描整個陣列。當逆序對數量變成零時，代表陣列已經是非遞減的，就可以停止。

整個演算法的流程就是：只要還存在逆序對，就從集合中取出相鄰和最小的一對進行合併，更新串列結構、更新集合、更新逆序對數量，並將操作次數加一，直到逆序對完全消失為止。


- 時間複雜度
    假設原本陣列長度為 `n`。最多只會進行 `n−1` 次合併，每一次合併都涉及到集合中的插入與刪除操作，這些操作的時間都是 `O(log n)`，其餘的更新都是常數時間，因此總時間複雜度是 `O(n log n)`。

- 空間複雜度：
   額外使用了數個大小為 `n` 的陣列來記錄前後指標，以及一個最多存放 `n` 個元素的有序集合，所以整體空間複雜度是 `O(n)`。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:

bool isBad(int i, const vector<long long>& nums, const vector<int>& next, int n) {
    return next[i] < n && nums[i] > nums[next[i]];
}

    int minimumPairRemoval(vector<int>& input) {
    
        int n = input.size();

        // use long long to avoid overflow
        vector<long long> nums(input.begin(), input.end());

        vector<int> prev(n), next(n);
        for (int i = 0; i < n; i++) {
            prev[i] = i - 1;
            next[i] = i + 1;
        }

        set<pair<long long,int>> st;
        for (int i = 0; i + 1 < n; i++)
            st.insert({nums[i] + nums[i + 1], i});


        int badCount = 0;
        for (int i = 0; i + 1 < n; i++)
            if (isBad(i, nums, next, n)) badCount++;

        int ops = 0;

        while (badCount > 0) {
            ops++;

            auto [sum, i] = *st.begin();
            st.erase(st.begin());

            int j = next[i];

            // remove old pairs
            if (prev[i] >= 0)
                st.erase({nums[prev[i]] + nums[i], prev[i]});
            if (next[j] < n)
                st.erase({nums[j] + nums[next[j]], j});

            // remove old bad relations
            if (prev[i] >= 0 && nums[prev[i]] > nums[i]) badCount--;
            if (nums[i] > nums[j]) badCount--;
            if (next[j] < n && nums[j] > nums[next[j]]) badCount--;

            // merge safely
            nums[i] += nums[j];

            // relink
            next[i] = next[j];
            if (next[j] < n) prev[next[j]] = i;

            // add new pairs
            if (prev[i] >= 0) {
                st.insert({nums[prev[i]] + nums[i], prev[i]});
                if (nums[prev[i]] > nums[i]) badCount++;
            }
            if (next[i] < n) {
                st.insert({nums[i] + nums[next[i]], i});
                if (nums[i] > nums[next[i]]) badCount++;
            }
        }

        return ops;
    }
};
```
