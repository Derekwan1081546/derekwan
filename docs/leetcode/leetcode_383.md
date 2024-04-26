
# Leetcode-383. Ransom Note
## 題目說明
給定兩個字串 `ransomNote` 和 `magazine`，如果 `ransomNote` 可以使用`magazine`中的字母構造，則傳回 true，否則傳回 false。

`magazine`中的每個字母只能在`ransomNote`中使用一次。
### 限制條件：
- `1 <= ransomNote.length, magazine.length <= 10^5`
- `ransomNote` 和 `magazine` 均由小寫英文字母組成。
## 解題思路
使用 `hash_map(unorder_map)` 的方法來解決此問題，將用來存儲字符作為鍵 `key` ，以及相應整數作為值 `value` 。這裡的`value`值代表了某個字元在字串中出現的次數。
接著計算出 `ransomNote` 中每個字元的出現次數和 `magazine` 中每個字元的出現次數，再來確認 `ransomNote` 中的每個字元在 `magazine` 中都有足夠的數量，如果 `magazine` 中的字元數量不夠 `ransomNote` 字串組成，則 `return false`，否則 `return true`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        unordered_map<char, int> ransomCount, magazineCount;

        // 計算 ransomNote 中每個字元的出現次數
        for (char c : ransomNote) {
            ransomCount[c]++;
        }

        // 計算 magazine 中每個字元的出現次數
        for (char c : magazine) {
            magazineCount[c]++;
        }

        // 確認 ransomNote 中的每個字元在 magazine 中都有足夠的數量
        for (auto& pair : ransomCount) {
            if (magazineCount[pair.first] < pair.second) {
                return false;
            }
        }

        return true;
    }
};
```