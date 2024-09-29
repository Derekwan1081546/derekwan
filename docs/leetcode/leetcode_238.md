
# Leetcode-238. Product of Array Except Self
## 題目說明
給定一個整數陣列 `nums`，傳回一個陣列 `answer`，使得 `answer[i]` 等於 `nums` 中除 `nums[i]` 之外的所有元素的乘積。

`nums` 的任何前綴或後綴的乘積保證適合 32 位元整數。

您必須編寫一個在 `O(n)` 時間內運作且不使用除法運算的演算法。

範例1：

輸入：`nums = [1,2,3,4]`
輸出：`[24,12,8,6]`

範例2：

輸入：`nums = [-1,1,0,-3,3]`
輸出：`[0,0,9,0,0]`
### 限制條件：
- `2 <= nums.length <= 105`
- `-30 <= nums[i] <= 30`
-  `nums` 的任何前綴或後綴的乘積保證適合 32 位元整數。

## 解題思路
- 前綴積：
    `prefix` 從左到右逐步累積，每一輪中將 `answer[i]` 設置為當前的 `prefix`，然後將當前元素乘入 `prefix`，準備給下一個元素使用。
- 後綴積：
    `postfix` 從右到左逐步累積，每一輪中將 `answer[i]` 再乘上當前的 `postfix`，然後將當前元素乘入 `postfix`，準備給前一個元素使用。
    這樣，`answer[i]` 最終存放的就是「除了 `nums[i]` 以外的所有元素的乘積」。

- 假設 `nums = [1, 2, 3, 4]`，最終的 `answer` 會是：

    前綴階段：`[1, 1, 2, 6]`

    後綴階段：`[24, 12, 8, 6]`

這樣的解法避免了除法並且能夠處理包含 `0` 的情況。時間複雜度是 `O(n)`，空間複雜度是 `O(1)`（忽略輸出向量所佔的空間）。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n);
        // 前綴積
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }

        // 後綴積
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= postfix;
            postfix *= nums[i];
        }

        return answer;
    }
};
```