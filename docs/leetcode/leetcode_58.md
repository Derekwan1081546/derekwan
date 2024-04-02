
# Leetcode-58. Length of Last Word
## 題目說明
給定一個由單字和空格組成的字串 `s`，傳回字串中最後一個單字的長度。

一個字就是一個最大子字串，僅由非空格字元組成。

### 限制條件：
- `1 <= s.length <= 10^4`
- `s` 僅由英文字母和空格 `' '` 組成。
- `s` 中至少有一個單字。
## 解題思路
在迴圈中，如果當前字符不是空格，則將計數器 `count` 加一，表示找到了一個單字的字符。如果遇到了空格字符，則檢查計數器 `count` 是否大於零，如果大於零，則表示之前已經找到了一個完整的單字，迴圈可以結束；如果計數器 `count` 等於零，則表示目前還沒有找到完整的單字，需要繼續向前搜索。

最後，函數返回計數器 `count`，即最後一個單字的長度。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int lengthOfLastWord(string s) {
        int count = 0;
        for (int i = s.size() - 1; i >= 0; i--) {
            if (s[i] != ' ') {
                count++;
            } else {
                if (count > 0) {
                    break;
                }
            }
        }
        return count;
    }
};
```