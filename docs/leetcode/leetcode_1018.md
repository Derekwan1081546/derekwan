
# Leetcode-1018. Binary Prefix Divisible By 5
## 題目說明
給定一個二進位數組 `nums`（從 `0` 開始索引）。

我們將 `xi` 定義為二進位表示為子數組 `nums[0..i]`（從最高有效位到最低有效位）的數字。

例如，如果 `nums = [1,0,1]`，則 `x0 = 1`，`x1 = 2`，`x2 = 5`。

傳回布林數組 `answer`，其中 `answer[i]` 為真表示 `xi` 能被 `5` 整除。

### 限制條件：
- `1 <= nums.length <= 10＾5`。
- `nums[i]` 的值要麼是 `0`，要麼是 `1`。

## 解題思路
題目給的是一個二進位數列，你需要檢查每個前綴（從開頭到第 `i` 位的子序列）所代表的二進位數是否能被 `5` 整除。

如果你直接把前綴轉成十進位，每次都重新計算，會非常沒效率，而且前綴數字會很大。因此，我們只需要維護「目前前綴數字的 `mod 5` 結果」即可。

要把新的 `bit` 加到前綴後面（相當於二進位左移一位再加上 `nums[i]`），公式是：
```cpp
num = (num * 2 + nums[i]) % 5
```
這樣就能保持 `num` 永遠是「前綴值 `mod 5`」的結果，不會 `overflow`，也能快速判斷是否能被 `5` 整除。

    - 若 `num == 0`，表示該前綴代表的數字可被 `5` 整除。

    - 若不是 `0`，則不可整除。

把每次的結果存進布林陣列即可得到答案。


## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<bool> prefixesDivBy5(vector<int>& nums) {
        int n = nums.size();
        vector<bool> ans(n, false);
        long long num = 0;
        for (int i = 0; i < n; i++) {
            num = (num * 2 + nums[i]) % 5;
            ans[i] = (num == 0);
        }
        return ans;
    }
};
```