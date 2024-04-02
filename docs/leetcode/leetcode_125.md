
# Leetcode-125. Valid Palindrome
## 題目說明
如果一個短語在將所有大寫字母轉換為小寫字母並刪除所有非字母數字字元後，向前和向後讀取相同的內容，則該短語是回文。 字母數字字元包括字母和數字。

給定一個字串 `s`，如果它是回文則傳回 `true`，否則傳回 `false`。

### 限制條件：
- `1 <= s.length <= 2 * 10^5`
- `s` 僅包含可列印的 `ASCII` 字元。
## 解題思路
首先將輸入的字串轉換為小寫，以便進行比較時不區分大小寫。然後，進行字串的處理，移除所有的非字母和數字字符。具體來說，使用了一個 for 迴圈遍歷字串中的每個字符，並使用 `isalnum` 函數來檢查是否是字母或數字。如果是字母或數字，則將其添加到新的字串 `s` 中。

接著，複製了處理後的字串 `s` 到一個新的字串 `reversed_str` 中，並將 `reversed_str` 反轉。最後，比較原始字串 `s` 和反轉後的字串 `reversed_str` 是否相等，如果相等則返回 `true`，否則返回 `false`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isPalindrome(string str) {
        // 將字串轉換為小寫
        transform(str.begin(), str.end(), str.begin(), ::tolower);
        // 移除符號和空格
        // str.erase(remove_if(str.begin(), str.end(),
        //                          [](unsigned char c) {
        //                              return isspace(c) || ispunct(c);
        //                          }),
        //           str.end());
        string s;
        for (int i = 0; i < str.length(); i++) {
            if (isalnum(str[i])) {
                s += str[i];
            }
        }
        string reversed_str = s;
        reverse(reversed_str.begin(), reversed_str.end());
        return s == reversed_str;
    }
};
```