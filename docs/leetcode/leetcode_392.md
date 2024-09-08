
# Leetcode-392. Is Subsequence
## 題目說明
給定兩個字串 `s` 和 `t`，如果 `s` 是 `t` 的子序列，則傳回 `true`，否則傳回 `false`。

字串的子序列是在不影響剩餘字元相對位置的情況下刪除原始字串中的一些（可以是沒有）字元而形成的新字串。 （即`'ace'`是`'bcde'`的子序列，而`'aec'`不是）。

### 限制條件：
- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- `s`和`t`僅由小寫英文字母組成
## 解題思路
首先初始化一個整數 `index`，表示目前在字串 `s` 中正在匹配的字符的索引位置。然後，它檢查字串 `s` 是否為空，如果為空，則 `s` 必定是 `t` 的子序列，直接返回 `true`。

接著，函數使用一個迴圈遍歷字串 `t` 中的每個字符。在每次迴圈迭代中，如果字串 `s` 中當前索引位置的字符與字串 `t` 中的字符相等，則將 `index` 加一，表示成功匹配一個字符。然後檢查是否已經匹配完字串 `s` 中的所有字符，如果是，則返回 `true`，否則繼續遍歷。

如果迴圈結束時都沒有找到匹配的字串 `s` 中的所有字符，則返回 `false`，表示字串 `s`不是字串 `t` 的子序列。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int index = 0;
        if (s.empty()) {
            return true;
        }
        for (int i = 0; i < t.length(); i++) {
            if (s[index] == t[i]) {
                index++;
                if (index == s.length()) {
                    return true;
                }
            }
        }
        return false;
    }
};
```