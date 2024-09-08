
# Leetcode-5. Longest Palindromic Substring
## 題目說明
給定一個字串 `s`，傳回 `s` 中最長的回文子字串。

###  限制條件：
- `1 <= s.length <= 1000`
- `s` 僅由數字和英文字母組成。
## 解題思路
- `expandAroundCenter` 函式：

這是一個輔助函式，從給定的中心點開始向兩側擴展，直到遇到不相等的字符或邊界為止。
它接收兩個參數：`left` 和 `right`，這兩個參數表示回文中心的位置，可能是單個字符（奇數長度回文）或兩個相鄰字符（偶數長度回文）。
擴展完成後，返回所找到的最長回文子串。
- `longestPalindrome` 函式：

首先檢查字串是否為空，若為空，直接返回空字串。

使用變數 `longest` 來儲存當前找到的最長回文子串。

然後進行迴圈，從每個字符位置開始，嘗試尋找以該位置為中心的回文子串：

- 奇數長度的回文：用 `expandAroundCenter(s, i, i)` 尋找以 `i` 為中心的回文子串。
- 偶數長度的回文：用 `expandAroundCenter(s, i, i + 1)` 尋找以 `i` 和 `i + 1` 為中心的回文子串。
在每次找到新的回文子串後，與當前最長回文子串比較，如果新找到的回文子串更長，則更新 longest。

返回結果：

最終返回找到的最長回文子串。

中心擴展法的優點：
此方法的時間複雜度為 `O(n^2)`，因為它從每個中心擴展，並且每次擴展的時間複雜度與字符串長度成正比。
這種方法相對簡單且直觀，並且可以同時處理奇數和偶數長度的回文子串。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    string expandAroundCenter(const string& s, int left, int right) {
        while (left >= 0 && right < s.size() && s[left] == s[right]) {
            left--;
            right++;
        }
        return s.substr(left + 1, right - left - 1);
    }
    string longestPalindrome(string s) {
        if (s.empty())
            return "";

        string longest;

        for (int i = 0; i < s.size(); i++) {
            // Odd-length palindrome
            string oddPalindrome = expandAroundCenter(s, i, i);
            if (oddPalindrome.size() > longest.size()) {
                longest = oddPalindrome;
            }

            // Even-length palindrome
            string evenPalindrome = expandAroundCenter(s, i, i + 1);
            if (evenPalindrome.size() > longest.size()) {
                longest = evenPalindrome;
            }
        }

        return longest;
    }
};
```