
# Leetcode-151. Reverse Words in a String
## 題目說明
給定一個輸入字串 `s`，反轉單字的順序。

單字被定義為非空格字元的序列。 `s` 中的單字將至少由一個空格分隔。

傳回由單一空格以相反順序連接的單字字串。

注意，`s` 可能在兩個單字之間包含前導或尾隨空格或多個空格。 傳回的字串應該只有一個空格來分隔單字。 請勿包含任何額外空格。
### 限制條件：
- `1 <= s.length <= 10^4`
- s 包含英文字母（大小寫）、數字和空格 `' '`
- s 中至少有一個單字
## 解題思路
- 反轉整個字串
- 反轉單字，同時處理多餘的空格
- 刪除多餘的空格並返回
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());
        int i = 0, left = 0, right = 0;
        while (i < s.size()) {
            while (s[i] == ' ' && i < s.size()) {
                i++;
            }
            if (i == s.size())
                break;
            while (s[i] != ' ' && i < s.size()) {
                s[right++] = s[i++];
            }
            reverse(s.begin() + left, s.begin() + right);
            s[right++] = ' ';
            left = right;
        }
        s.resize(right - 1);
        return s;
    }
};
```