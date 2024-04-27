
# Leetcode-219. Contains Duplicate II
## 題目說明
給定一個整數數組 `nums` 和一個整數 `k`，如果數組中有兩個不同的索引 `i` 和 `j` 且 `nums[i] == nums[j]` 且 `abs(i - j) <= k` (這裡的 `abs()` 函數是取絕對值)，則傳回 `true`。
### 限制條件：
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= k <= 10^5`

## 解題思路
使用 `unordered_map` 來儲存每個元素最近一次出現的索引。當我們在跑nums迴圈時，如果找到一個已經存在於映射中的元素，並且它的當前索引與映射中儲存的索引之差不超過 `k`，則直接返回 `true`。如果沒有找到任何符合條件的重複元素，則在結束迴圈後返回 `false`。此外，實際上不需要使用 `abs(i - indexMap[nums[i]])`。這是因為我們總是將當前索引 `i` 更新到 `unordered_map` 中作為元素最後出現的位置，而迴圈遍歷 `nums` 時，`i` 總是在增加的。這意味著當我們計算 `i - indexMap[nums[i]]` 時，`i` 必然大於或等於 `indexMap[nums[i]]`（之前的索引），因此差值總是非負的。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> indexMap; // 用來儲存元素及其最近一次出現的索引

        for (int i = 0; i < nums.size(); i++) {
            if (indexMap.find(nums[i]) != indexMap.end() &&
                i - indexMap[nums[i]] <= k) {
                return true; // 找到一對相同的元素，且它們的索引之差不超過k
            }
            indexMap[nums[i]] = i; // 更新或添加元素的索引
        }
        return false;
    }
};
```