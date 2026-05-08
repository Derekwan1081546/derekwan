
# Leetcode-3548. Equal Sum Grid Partition II
## 題目說明
給定一個 m × n 的正整數矩陣。你的任務是判斷是否可以對這個矩陣進行一次水平或垂直切割，使得：

切割後得到的兩個區域均非空。

兩個區域中元素的總和相等，或者可以透過最多排除一個單元格（從任一區域中排除）來使之相等。

如果排除一個單元格，則該區域的其餘部分必須保持連接。

如果存在這樣的分割，則傳回 true；否則傳回 false。

注意：如果一個區域內的每個單元格都可以透過向上、向下、向左或向右移動穿過該區域內的其他單元格到達，則該區域是連通的。

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
private:
    // 檢查在指定區塊內拔除 (r, c) 是否會破壞連通性
    bool canRemove(int r, int c, int r1, int r2, int c1, int c2) {
        int R = r2 - r1 + 1; // 區塊的高度
        int C = c2 - c1 + 1; // 區塊的寬度

        if (R == 1 && C == 1)
            return false; // 只有一格拔掉就空了 (違背 non-empty)
        if (R == 1)
            return c == c1 || c == c2; // 單行：只能拔左右兩端
        if (C == 1)
            return r == r1 || r == r2; // 單列：只能拔上下兩端
        return true;                   // 多行多列：拔任何一格都不會斷開連通性
    }

public:
    bool canPartitionGrid(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        long long total_sum = 0;
        vector<long long> row_sums(m, 0);
        vector<long long> col_sums(n, 0);

        // 記錄每個數值出現的座標位置，以便快速尋找「能扣除的格子」
        unordered_map<long long, vector<pair<int, int>>> val_to_pos;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int val = grid[i][j];
                total_sum += val;
                row_sums[i] += val;
                col_sums[j] += val;
                val_to_pos[val].push_back({i, j});
            }
        }

        // 檢查水平切分
        long long current_sum = 0;
        for (int r = 0; r < m - 1; r++) { // 在第 r 行之後切一刀
            current_sum += row_sums[r];
            long long s1 = current_sum;             // 上半部總和
            long long s2 = total_sum - current_sum; // 下半部總和

            if (s1 == s2)
                return true;

            long long diff = abs(s1 - s2);
            // 檢查兩者差值是否剛好等於網格中的某個元素
            if (val_to_pos.count(diff)) {
                for (auto& pos : val_to_pos[diff]) {
                    int pr = pos.first, pc = pos.second;
                    // 如果上半部較大，且該元素位於上半部
                    if (s1 > s2 && pr <= r) {
                        if (canRemove(pr, pc, 0, r, 0, n - 1))
                            return true;
                    }
                    // 如果下半部較大，且該元素位於下半部
                    else if (s2 > s1 && pr > r) {
                        if (canRemove(pr, pc, r + 1, m - 1, 0, n - 1))
                            return true;
                    }
                }
            }
        }

        // 檢查垂直切分
        current_sum = 0;
        for (int c = 0; c < n - 1; c++) { // 在第 c 列之後切一刀
            current_sum += col_sums[c];
            long long s1 = current_sum;             // 左半部總和
            long long s2 = total_sum - current_sum; // 右半部總和

            if (s1 == s2)
                return true;

            long long diff = abs(s1 - s2);
            if (val_to_pos.count(diff)) {
                for (auto& pos : val_to_pos[diff]) {
                    int pr = pos.first, pc = pos.second;
                    // 如果左半部較大，且該元素位於左半部
                    if (s1 > s2 && pc <= c) {
                        if (canRemove(pr, pc, 0, m - 1, 0, c))
                            return true;
                    }
                    // 如果右半部較大，且該元素位於右半部
                    else if (s2 > s1 && pc > c) {
                        if (canRemove(pr, pc, 0, m - 1, c + 1, n - 1))
                            return true;
                    }
                }
            }
        }

        return false;
    }
};
```
