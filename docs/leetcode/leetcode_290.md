
# Leetcode-290. Word Pattern
## 題目說明
給定一個 `pattern` 和一個字串 `s`，找出 `s` 是否遵循相同的模式。

這裡follow表示完全匹配，這樣 `pattern` 中的字母和 `s` 中的非空單字之間存在雙射(`bijection`)。
### 限制條件：
- `1 <= pattern.length <= 300`
- `pattern`僅包含小寫英文字母。
- `1 <= s.length <= 3000`
- `s` 僅包含小寫英文字母和空格 `' '`。
- `s` 不包含任何前導或尾隨空格。
- `s` 中的所有單字均由一個空格分隔。

## 解題思路
首先使用 `stringstream`來分割字串，並將字串`pushback`到`words`的`vector`中，接著宣告兩個 `hash_map(unorder_map)` 格式分別為 `<char,string>` 和 `<string,char>`。
接著檢查 `pattern` 到 `words` 的映射，檢查 `char_to_word.count(c)` 會返回 `1`（表示已存在），否則返回 `0`（表示不存在）。這樣的檢查確保了每個字串只能對應到一個特定的字符，維護了一對一的關係。這是為了確保從字串到模式字符的映射是唯一的，與模式字符到字串的映射相對應。同理檢查 `words` 到 `pattern` 的映射也是一樣的方法，最後如果檢查都符合映射則`return true`，否則`return false`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        vector<string> words;
        stringstream ss(s); // 使用 stringstream 來分割字串
        string word;
        while (ss >> word) {
            words.push_back(word);
        }

        if (pattern.size() != words.size())
            return false;

        unordered_map<char, string> char_to_word;
        unordered_map<string, char> word_to_char;

        for (int i = 0; i < pattern.size(); i++) {
            char c = pattern[i];
            string w = words[i];

            // 檢查 pattern 到 word 的映射
            if (char_to_word.count(c) && char_to_word[c] != w)
                return false;
            // 檢查 word 到 pattern 的映射
            if (word_to_char.count(w) && word_to_char[w] != c)
                return false;

            char_to_word[c] = w;
            word_to_char[w] = c;
        }
        return true;
    }
};
```