
# Leetcode-1984. Minimum Difference Between Highest and Lowest of K Scores
## 題目說明
給定一個從 `0` 開始索引的整數陣列 `nums`，其中 `nums[i]` 表示第 `i` 個學生的分數。同時給定一個整數 `k`。

從陣列中選取任意 `k` 個學生的分數，使得這 `k` 個分數中最高分和最低分之間的差值最小。

傳回最小的可能差值。

### 限制條件：
- `1 <= k <= nums.length <= 1000`。
- `0 <= nums[i] <= 10^5`。

## 解題思路
本題的目標是從陣列中選出 `k` 個元素，使這 `k` 個元素中的最大值與最小值之差最小。當 `k` 等於 `1` 時，只會選到單一元素，其最大值與最小值必然相同，因此差值為 `0`，可以直接回傳。

對於一般情況，關鍵在於先將整個陣列進行排序。排序後，若選擇任意 `k` 個元素，這些元素的最小值與最大值一定會落在排序後陣列中的某一段連續區間內。若選擇非連續的元素，勢必會包含更小的最小值或更大的最大值，導致差值不會更小，因此只需考慮排序後的連續 `k` 個元素即可。

接著從排序後的陣列左到右依序檢查每一段長度為 `k` 的連續子陣列，對於每一段，只需計算該區間最右邊的值減去最左邊的值，即可得到這一組 `k` 個數的差值，並持續更新目前找到的最小差值。當所有可能的連續區間都檢查完成後，所得到的最小差值即為答案。

此方法的時間複雜度主要來自排序，為 `O(n log n)`，而後續線性掃描所有可能區間為 `O(n)`，因此整體時間複雜度為 `O(n log n)`。空間複雜度除了排序所需的額外空間外，僅使用常數額外變數，為 `O(1)`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int minimumDifference(vector<int>& nums, int k) {
        if (k == 1)
            return 0;
        int mindiff = INT_MAX;
        vector<int> ans;
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size() - k + 1; i++) {
            int currentdiff = nums[i + k - 1] - nums[i];
            mindiff = min(mindiff, abs(currentdiff));
        }
        return mindiff;
    }
};
```