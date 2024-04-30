
# Leetcode-20. Valid Parentheses
## 題目說明
給定一個僅包含字元 `'('`, `')'`, `'{'`, `'}'`, `'['` 和 `']'` 的字串 `s`，確定輸入字串是否有效。

輸入字串在以下情況下有效：

左括號必須由相同類型的括號封閉。
左括號必須以正確的順序關閉。
每個右括號都有一個對應的相同類型的左括號。

### 限制條件：
- `1 <= s.length <= 104^`
- `s` 僅由括號 `「()[]{}」` 組成。

## 解題思路
使用`stack`的資料結構做有效字串的判斷，首先將有效的字元兩兩配對，將`'('`,`'{'`和`'['`先`push`到`stack`中，接著若是遇到`')'`, `'}'`和 `']'`，若是符合其配隊的字元，則將`stack`中最上層的元素`pop`出來，迴圈跑完之後，最後檢查`stack`中是否為空，若為空則`return true`，否則`return false`;
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isValid(string s) {
        stack<char> stack;
        for (char c : s) {
            switch (c) {
            case '(':
            case '{':
            case '[':
                stack.push(c);
                break;
            case ')':
                if (stack.empty() || stack.top() != '(')
                    return false;
                stack.pop();
                break;
            case '}':
                if (stack.empty() || stack.top() != '{')
                    return false;
                stack.pop();
                break;
            case ']':
                if (stack.empty() || stack.top() != '[')
                    return false;
                stack.pop();
                break;
            default:
                // 如果遇到非括號字符，可視情況處理，這裡直接忽略
                break;
            }
        }
        return stack.empty(); // 如果stack為空，表示所有開啟括號都被正確匹配
    }
};
```