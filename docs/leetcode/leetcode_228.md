
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
首先先跑雙迴圈來比對當前元素下一個值是否為連續同時需檢查下一個元素是否會差過 `nums` 的大小，若是發現下一個值是連續則將繼續判斷，否則跳出，接著判斷是否有連續的字串，如果有連續
則創建一個格式為 `"起始值->終止值"` 的字符串，並將其加入到 `ans` 向量中。反之如果沒有，說明 `nums[i]` 沒有連續的數字，直接將 `nums[i]` 轉換為字符串，加入 `ans`向量中。接著依序  `push_back` 到 `ans` 向量當中直到迴圈結束為止，最後回傳 `ans` 向量即完成。
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