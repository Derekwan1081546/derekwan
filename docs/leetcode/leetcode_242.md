
# Leetcode-242. Valid Anagram
## 題目說明
給定兩個字串 `s` 和 `t`，如果 `t` 是 `s` 的 `Anagram(字謎詞)`，則傳回 `true`，否則傳回 `false`。

`Anagram(字謎詞)` 是透過重新排列不同單字或短語的字母而形成的單字或短語，通常使用所有原始字母一次。
### 限制條件：
- `1 <= s.length，t.length <= 5 * 10^4`
- `s` 和 `t` 由小寫英文字母組成。

## 解題思路
使用 `hash_map(unorder_map)` 的方法來解決此問題，將用來存儲字符作為鍵 `key` ，以及相應整數作為值 `value` 。這裡的`value`值代表了某個字元在字串中出現的次數。
接著計算出 `str1` 中每個字元的出現次數和 `str2` 中每個字元的出現次數，再來確認兩個 `hash_map` 中的每個字元的出現次數，如果不相同，則表示不是變位詞，則 `return false`，否則 `return true`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isAnagram(string s, string t) {
        // 如果兩個字串長度不同，則一定不是變位詞
        if (s.length() != t.length()) {
            return false;
        }
        unordered_map<char, int> str1, str2;
        // 對第一個字串中的每個字元，增加計數
        for (char c : s) {
            str1[c]++;
        }
        // 對第二個字串中的每個字元，增加計數
        for (char c : t) {
            str2[c]++;
        }
        // 檢查兩個hash_map各字元的出現次數，如果不相同，則表示不是變位詞
        for (auto& a : str1) {
            if (str2[a.first] != a.second)
                return false;
        }
        return true;
    }
};
```