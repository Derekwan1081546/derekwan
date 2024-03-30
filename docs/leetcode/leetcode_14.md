
# Leetcode-14. Longest Common Prefix
## 題目說明
編寫一個函數來尋找字串陣列中最長的公共前綴字串。

如果沒有公共前綴，則傳回空字串“”。
### 限制條件：
- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` 僅由小寫英文字母組成。
## 解題思路
首先先將第一個一串設為預設比對的對象，接著跑一個迴圈去一一跟其他字串做比對，先從頭到尾檢查，若是不完全一樣，則將`preflen`減小再繼續做比對直到所有字串都比對完，比對途中如果`preflen`為零則回傳空字串代表沒有公共前綴字串，最後將剩餘的`pref`字串回傳即為公共前綴字串。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        // string ans = "";
        // sort(strs.begin(), strs.end());
        // int n = strs.size();
        // string first = strs[0], last = strs[n - 1];
        // for (int i = 0; i < min(first.size(), last.size()); i++) {
        //     if (first[i] != last[i]) {
        //         return ans;
        //     }
        //     ans += first[i];
        // }
        // return ans;

        string pref = strs[0];
        int preflen = pref.size();
        for (int i = 0; i < strs.size(); i++) {
            string s = strs[i];
            while (pref != s.substr(0, preflen)) {
                preflen--;
                if (preflen == 0) {
                    return "";
                }
                pref = pref.substr(0, preflen);
            }
        }
        return pref;
    }
};
```