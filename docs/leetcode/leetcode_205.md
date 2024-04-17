
# Leetcode-205. Isomorphic Strings
## 題目說明
給定兩個字串 `s` 和 `t`，確定它們是否同構。

如果 `s` 中的字元可以替換得到 `t`，則兩個字串 `s` 和 `t` 同構。

所有出現的字符都必須替換為另一個字符，同時保留字符的順序。 兩個字符不能映射到同一個字符，但一個字符可以映射到其自身。
### 限制條件：
- `1 <= s.length <= 5 * 10^4`
- `t.length == s.length`
- `s` 和 `t` 由任何有效的 `ascii` 字元組成。
## 解題思路
如果訊息長度不同，則它們不可能是同構的。
若長度相同，接者逐一比較每個字母：

如果某個字母在兩個字串中的相同位置首次出現（例如「a」和「b」都首先出現在位置 0），則在各自的表中為這兩個字串做一個計數標記。
如果某個字母再次出現，請檢查其先前的位置是否在兩個計數表中相符。 如果不是，則這些訊息具有不同的代碼並且不是相同的秘密訊息。
繼續到最後如果您完成比較所有字母以及兩個計數表中匹配的每個字母，則訊息使用相同的代碼並且是同構的！
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        vector<int> indexS(200, 0);
        vector<int> indexT(200, 0);

        if (s.length() != t.length()) {
            return false;
        }
        for (int i = 0; i < s.length(); i++) {
            if (indexS[s[i]] != indexT[t[i]]) {//因為一開始都初始化為零，所以為true
                return false;
            }
            indexS[s[i]] = i + 1;
            indexT[t[i]] = i + 1;
        }
        return true;
    }
};
```