
# Leetcode-228. Summary Ranges
## 題目說明
給你一個排序的唯一整數數組 `nums`。

範圍 `[a,b]` 是從 `a` 到 `b`（含`a`和`b`）的所有整數的集合。

傳回精確覆蓋數組中所有數字的最小排序範圍清單。也就是說，`nums` 的每個元素恰好被一個範圍覆蓋，並且不存在使得 `x` 位於其中一個範圍但不在 `nums` 中的整數 `x`。

列表中的每個範圍 `[a,b]` 應輸出為：

如果 `a != b`，則為`"a->b"` 
如果 `a == b`，則為`"a"`
### 限制條件：
- `0 <= nums.length <= 20`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `nums` 的所有值都是唯一的。
- `nums` 依升冪排序。

## 解題思路
使用 `unordered_map` 來儲存每個元素最近一次出現的索引。當我們在跑nums迴圈時，如果找到一個已經存在於映射中的元素，並且它的當前索引與映射中儲存的索引之差不超過 `k`，則直接返回 `true`。如果沒有找到任何符合條件的重複元素，則在結束迴圈後返回 `false`。此外，實際上不需要使用 `abs(i - indexMap[nums[i]])`。這是因為我們總是將當前索引 `i` 更新到 `unordered_map` 中作為元素最後出現的位置，而迴圈遍歷 `nums` 時，`i` 總是在增加的。這意味著當我們計算 `i - indexMap[nums[i]]` 時，`i` 必然大於或等於 `indexMap[nums[i]]`（之前的索引），因此差值總是非負的。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> ans;
        for (int i = 0; i < nums.size(); i++) {
            int j = i;
            while (j + 1 < nums.size() && nums[j] + 1 == nums[j + 1]) {
                j++;
            }
            if (i == j) {
                ans.push_back(to_string(nums[i]));
            } else {
                ans.push_back(to_string(nums[i]) + "->" + to_string(nums[j]));
            }
            i = j; // 更新 i 到 j，因為外層迴圈會進行 i++
        }
        return ans;
    }
};
```