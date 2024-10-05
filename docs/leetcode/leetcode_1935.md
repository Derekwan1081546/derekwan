
# Leetcode-1935. Maximum Number of Words You Can Type
## 題目說明
鍵盤故障，某些字母鍵不起作用。鍵盤上的所有其他按鍵都可以正常工作。

給定一個由單一空格分隔的單字字串文字（無前導或尾隨空格）和一個由所有損壞的不同字母鍵組成的字串`brokenLetters`，傳回您可以使用此鍵盤完全鍵入的文字中的單字數。

- 範例1：

    輸入：`text =“hello world”`，`brokenLetters =“ad”`

    輸出：`1`

    解釋：
    我們無法輸入`world`，因為`d`鍵已損壞。

- 範例2：

    輸入：`text =“leet code”`，`brokenLetters =“lt”`

    輸出：`1`


    解釋：
    我們無法輸入`leet`，因為`l`和`t`鍵已損壞。

- 範例3：

    輸入：`text =“leet code”`，`brokenLetters =“e”`

    輸出：`0`
    
    解釋：
    我們無法輸入任何一個單字，因為`e`鍵壞了。

### 限制條件：
- `1 <= text.length  <= 10^4`
- `0 <= BreakLetters.length <= 26`
- 文字由單一空格分隔的單字組成，沒有任何前導或尾隨空格。
- 每個單字僅由小寫英文字母組成。
- `brokenLetters` 由不同的小寫英文字母組成。

## 解題思路
遍歷每個字元：

遇到空格，表示目前單字結束。此時如果 `type` 標記為 `true`，則表示目前單字沒有包含損壞字母，增加計數。
如果單字內包含損壞的字母，則 `type` 設為 `false`，表示該單字無法正常打出。

檢查最後一個單字：

最後一個單字不會以空格結尾，因此需要在循環結束後單獨檢查最後一個單字是否可以正常輸入。
使用 `find` 函數檢查損壞字元：

透過 `brokenLetters.find(s)` 檢查字元 `s` 是否出現在損壞的字母中，如果找到了則設定 `type = false`。
時間複雜度：
`O(n * m)：n` 是字串 `text` 的長度，`m` 是 `brokenLetters` 的長度。因為對於每個字符，可能要檢查一次 `brokenLetters`。

本問題使用 `std::string::find` 函數:

`std::string::find` 是 `std::string` 類別的成員函數，可以用來尋找字串中某個字元或子字串的位置。如果找到了，它會傳回字元或子字串在字串中的索引，如果找不到，則傳回` std::string::npos`。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int canBeTypedWords(string text, string brokenLetters) {
        int count = 0;
        bool type = true;
        for (char& s : text) {
            if (s == ' ') { // 當遇到空格，代表一個單字结束
                if (type) {
                    count++; // 如果這個單字沒有損壞字母，則counter加1
                }
                type = true; // 重置為 true，開始檢查下一個單字
            } else {
                // 檢查當前字元是否在損壞字母中
                if (brokenLetters.find(s) != string::npos) {
                    type = false; // 如果當前字元是損壞的字母，標誌為 false
                }
            }
        }

        // 最後一個單字需要單獨檢查（因為它後面沒有空格）
        if (type) {
            count++;
        }
        return count;
    }
};
```