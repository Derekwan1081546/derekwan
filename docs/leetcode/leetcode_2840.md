# Leetcode-2840. Check if Strings Can be Made Equal With Operations II
## 題目說明
給定兩個長度皆為 `n` 的字串 `s1` 與 `s2`，皆由小寫英文字母組成。

你可以對任一字串執行下列操作任意多次：

- 選擇兩個索引 `i` 與 `j`，滿足 `i < j` 且 `j - i` 為**偶數**，然後交換字串中這兩個位置的字元。

若可以透過上述操作使 `s1` 與 `s2` 相等，回傳 `true`，否則回傳 `false`。

### 限制條件：
- `n == s1.length == s2.length`。
- `1 <= n <= 10^5`。
- `s1` 與 `s2` 僅由小寫英文字母組成。


## 解題思路

這段程式碼的目標是解決 **LeetCode 2840. Check if Strings Can be Made Equal With Operations II**（判斷兩字串是否可透過操作變得相等）。
題目的核心觀察在於：每次交換的兩個索引 `i` 與 `j` 必須滿足 `j - i` 為偶數，這代表 **只有相同奇偶性的索引之間可以任意互換位置**。

也就是說：

- 所有**偶數索引**（0, 2, 4, ...）的字元可以任意重排。
- 所有**奇數索引**（1, 3, 5, ...）的字元可以任意重排。
- 但「偶數索引」與「奇數索引」之間的字元 **永遠無法互換**。

因此 `s1` 能變為 `s2` 的**充分必要條件**是：
`s1` 中偶數位置的字元（多重集合）與 `s2` 中偶數位置相同，且奇數位置也相同。

### 演算法步驟

本程式採用「**頻率計數**」的方式驗證：

1.  **分組計數**：
    使用兩個雜湊表 `evenCount` 和 `oddCount`，遍歷所有索引 `i`：
    * 若 `i` 為偶數：`s1[i]` 的計數 `+1`，`s2[i]` 的計數 `-1`（記入 `evenCount`）。
    * 若 `i` 為奇數：`s1[i]` 的計數 `+1`，`s2[i]` 的計數 `-1`（記入 `oddCount`）。

2.  **驗證平衡**：
    若 `s1` 與 `s2` 在同一奇偶組中擁有相同的字元組成，則每個字元的計數最終應恰好為 `0`。
    * 遍歷 `evenCount`，若任一字元計數不為 `0`，回傳 `false`。
    * 遍歷 `oddCount`，若任一字元計數不為 `0`，回傳 `false`。

3.  **回傳結果**：
    全部通過後回傳 `true`。

---

### 複雜度分析

* **時間複雜度：$O(N)$**
  其中 $N$ 為字串長度。遍歷字串一次進行計數，再遍歷雜湊表驗證（最多 26 個字元），整體為線性時間。

* **空間複雜度：$O(1)$**
  雜湊表最多各存 26 個小寫英文字母，為常數級空間。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool checkStrings(string s1, string s2) {
        int n = s1.length();
        unordered_map<char, int> evenCount;
        unordered_map<char, int> oddCount;
        for (int i = 0; i < n; i++) {
            if (i % 2 == 0) {
                evenCount[s1[i]]++;
                evenCount[s2[i]]--;
            } else {
                oddCount[s1[i]]++;
                oddCount[s2[i]]--;
            }
        }
        for (auto& pair : evenCount) {
            if (pair.second != 0)
                return false;
        }
        for (auto& pair : oddCount) {
            if (pair.second != 0)
                return false;
        }
        return true;
    }
};
```