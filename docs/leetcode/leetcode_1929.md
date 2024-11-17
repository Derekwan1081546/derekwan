
# Leetcode-1929. Concatenation of Array
## 題目說明
給定一個長度為 `n` 的整數陣列 `nums`，您想要建立一個長度為 `2n` 的陣列 `ans`，其中`ans[i] == nums[i]` 且 `ans[i + n] == nums[i]``（0 < = i < n）` `（0-索引）`。

具體來說，`ans` 是兩個 `nums` 陣列的串聯。

傳回陣列 `ans`。



- 範例1：

    輸入：nums = [1,2,1]
    輸出：[1,2,1,1,2,1]
    說明：數組 ans 的構成如下：
    - ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
    - ans = [1,2,1,1,2,1]

- 範例2：

    輸入：nums = [1,3,2,1]
    輸出：[1,3,2,1,1,3,2,1]
    說明：數組 ans 的構成如下：
    - ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
    - ans = [1,3,2,1,1,3,2,1]


### 限制條件：
- `n == nums.length`
- `1 <= n <= 1000`
- `1 <= nums[i] <= 1000`

## 解題思路
這題要求將一個整數陣列 `nums` 拼接兩次，並返回新的陣列。解題思路很簡單：

1. **初始化一個新陣列 `ans`**，先將 `nums` 複製進去。
2. **遍歷原陣列 `nums`**，將每個元素依序再次附加到 `ans` 後面。
3. 最後，返回拼接後的陣列 `ans`。

這樣就能達成將 `nums` 重複兩次的效果，例如輸入 `[1, 2, 3]`，輸出為 `[1, 2, 3, 1, 2, 3]`。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        vector<int> ans;
        ans = nums;
        for (int i = 0; i < nums.size(); i++) {
            ans.push_back(nums[i]);
        }
        return ans;
    }
};
```