
# Leetcode-3315. Construct the Minimum Bitwise Array II
## 題目說明
給定一個包含 `n` 個質數的陣列 `nums`。

你需要構造一個長度為 `n` 的陣列 `ans`，使得對於每個索引 `i`，`ans[i]` 與 `ans[i] + 1` 的位元或運算結果等於 `nums[i]`，即 `ans[i] OR (ans[i] + 1) == nums[i]`。

此外，你必須使結果數組中 `ans[i]` 的每個值最小。

如果無法找到滿足條件的 `ans[i]` 值，則令 `ans[i] = -1`。

### 限制條件：
- `1 <= nums.length <= 100`
- `2 <= nums[i] <= 10＾9`
- `nums[i]` 是質數。


## 解題思路
對每個 `nums[i]`，要找最小的 `x` 使得 `x | (x + 1) = nums[i]`。

觀察可知，`x + 1` 會將 `x` 最右邊連續的 `1` 變成 `0` 並進位，因此
`x | (x + 1)` 的結果一定是「從某一位開始，右邊全部為 `1`」。

做法是從最低位開始檢查 `nums[i]` 的 `bit`，找到第一個為 `0` 的位置，
將該位右邊的所有 `bit` 視為連續的 `1`，把其中一個 `1` 移除即可得到最小的 `x`。

若 `nums[i] = 2`，則不可能有解，直接回傳 `-1`。

- 時間複雜度

    每個數字最多檢查其二進位長度（約 `log nums[i]`）

- 總時間複雜度：
    `O(n · log M)`（`M` 為 `nums` 中的最大值）

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<int> minBitwiseArray(vector<int>& nums) {
        for (int& x : nums) {
            int res = -1;
            int d = 1;
            while ((x & d) != 0) { //檢查 x 從最低位（LSB）開始有多少個連續的 1
                res = x - d;
                d <<= 1;//向左移一個bit (乘二)
            }
            x = res;
        }
        return nums;
    }
};
```

```cpp title="C++ 另解bitwise " showLineNumbers
class Solution {
public:
    vector<int> minBitwiseArray(vector<int>& nums) {
        for (int& x : nums) {
            if (x % 2 == 0) {
                // 規則 1: 如果是偶數，無解
                x = -1;
            } else {
                // 規則 2: 如果是奇數，找出二進位末尾連續的 1
                // 只要把這串連續 1 的"最高位"變成 0 即可

                int p = 1;
                // 檢查 x 的第 p 位是否為 1
                // (x >> p) & 1 意思是把 x 右移 p 位後看最後一位是不是 1
                while ((x >> p) & 1) {
                    p++;
                }

                // 此時 p 指向的是"第一個 0"的位置
                // 所以連續 1 的最高位是在 p-1 的位置
                // 我們要把第 (p-1) 位減掉 (即 1 << (p-1))
                x = x - (1 << (p - 1));
            }
        }
        return nums;
    }
};
```

