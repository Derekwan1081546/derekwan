
# Leetcode-49. Group Anagrams
## 題目說明
給定一個字串數組 `strs`，將字謎詞分組在一起。您可以按任意順序返回答案。

字謎詞是透過重新排列不同單字或短語的字母而形成的單字或短語，通常使用所有原始字母一次。

### 限制條件：
- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` 均由小寫英文字母組成。

## 解題思路
使用 `hash_map(unorder_map)` 的方法來解決此問題，將用來存儲字符作為鍵 `string` ，以及相應整數作為值 `vector<string>` 。將一個字串陣列中的字串分組，將所有字謎（即由相同字母組成但排列順序可能不同的字串）分到同一組中。當將`strs[i]`排序後應該使用一個新的變量來儲存排序後的結果，這樣原始的字串才不會被改變。最後將分組完後的字串 `push_back` 到 `ans` 的 `vector` 陣列中即完成。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (int i = 0; i < strs.size(); i++) {
            string sortedStr =
                strs[i]; // 創建一個新的字串變量來存儲排序後的字串
            sort(sortedStr.begin(), sortedStr.end()); // 對新創建的字串進行排序
            mp[sortedStr].push_back(
                strs[i]); // 使用排序後的字串作為鍵來存儲原始字串
        }
        vector<vector<string>> ans;
        for (auto& a : mp) {
            ans.push_back(a.second);
        }
        return ans;
    }
};
```