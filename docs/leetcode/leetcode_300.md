
# Leetcode-300. Longest Increasing Subsequence
## 題目說明
給定一個整數數組 `nums`，傳回最長嚴格遞增子序列的長度(`longest strictly increasing subsequence`)。
### 限制條件：
- `1 <= nums.length <= 2500`。
- `-10^4 <= nums[i] <= 10^4`。

## 解題思路
1. 建立一個輔助陣列 `sub`
    - 用來維護「目前已知最小結尾的遞增子序列」。
    - `sub[k]` 表示：長度為 `k+1` 的遞增子序列，其「最小可能結尾值」。

2. 逐一處理 `nums` 內的每個元素 `i`
    - 如果 `sub` 為空或 `i` 大於 `sub` 的最後一個元素：
        - 代表可以延伸目前的遞增子序列，將 `i` 加到 `sub` 後面。
    - 否則：
        - 使用 `lower_bound` 在 `sub` 中找到「第一個 >= `i` 的位置」。
        - 將該位置的值替換成 `i`，使得這個長度的 `LIS` 末尾值更小，有助於未來形成更長的 `LIS`。

3. 為什麼替換是合理的？
    - 我們不維護真正的 `LIS`，而是維護「每種長度下最好的（最小結尾值）狀態」。
    - 結尾越小，越可能接上後續更大的數字，形成更長的遞增序列。
    - 因此替換行為不會破壞答案，反而能保持未來的最佳可能性。

4. 答案
    - 最後 `sub.size()` 就是 `LIS` 的長度。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> sub;
        for (auto i : nums) {
            if (sub.empty() || sub[sub.size() - 1] < i) {
                sub.push_back(i);
            } else {
                auto x = lower_bound(sub.begin(), sub.end(), i);
                *x = i;
            }
        }
        return sub.size();
    }
};
```