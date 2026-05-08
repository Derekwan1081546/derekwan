# Leetcode-3474. Lexicographically Smallest Generated String

## 題目說明
給定兩個字串 `str1` 與 `str2`，長度分別為 `n` 與 `m`。

一個長度為 `n + m - 1` 的字串 `word` 被定義為由 `str1` 與 `str2` **生成**，若對每個索引 `0 <= i <= n - 1` 滿足：

- 若 `str1[i] == 'T'`，則 `word` 中從索引 `i` 開始、長度為 `m` 的子字串必須**等於** `str2`，即 `word[i..(i + m - 1)] == str2`。
- 若 `str1[i] == 'F'`，則 `word` 中從索引 `i` 開始、長度為 `m` 的子字串必須**不等於** `str2`，即 `word[i..(i + m - 1)] != str2`。

回傳字典序最小的可生成字串。若無法生成任何合法字串，回傳空字串 `""`。

### 限制條件：
- `1 <= n == str1.length <= 10^4`。
- `1 <= m == str2.length <= 500`。
- `str1` 僅由 `'T'` 或 `'F'` 組成。
- `str2` 僅由小寫英文字母組成。


## 解題思路

這段程式碼的目標是解決 **LeetCode 3474. Lexicographically Smallest Generated String**（字典序最小的生成字串）。

核心策略是**先處理強制約束（'T'），再貪婪填入字典序最小的字元，同時確保不違反禁止約束（'F'）**。

### 演算法步驟

1.  **初始化**：
    建立長度為 `n + m - 1` 的字串 `ans`，所有字元初始為 `'*'`（代表尚未決定）。

2.  **處理所有 'T' 約束（強制匹配）**：
    遍歷 `str1`，對每個 `str1[i] == 'T'`，將 `str2` 的每個字元強制覆蓋到 `ans[i..i+m-1]`：
    * 若該位置已有值且與 `str2[j]` 矛盾，代表兩個 'T' 約束互相衝突，直接回傳 `""`。
    * 否則將 `ans[i + j] = str2[j]`。

3.  **貪婪填入剩餘的 `'*'` 位置**：
    從左到右遍歷 `ans`，對每個仍為 `'*'` 的位置，從 `'a'` 開始嘗試每個字母：
    * 暫時將 `ans[i] = c`，然後檢查所有涵蓋位置 `i` 且對應 `str1[j] == 'F'` 的窗口。
    * 若填入 `c` 後使得某個 'F' 窗口的子字串恰好等於 `str2`（違反約束），則跳過此字母，嘗試下一個。
    * 找到第一個合法字母即保留（確保字典序最小）。

4.  **最終驗證**：
    所有位置填完後，再次遍歷所有 `str1[i] == 'F'` 的位置，確認 `ans[i..i+m-1] != str2`。
    * 這是為了處理在步驟 2 中由 'T' 約束直接填入的字元，可能恰好滿足了某個 'F' 窗口的情況。
    * 若發現違反，回傳 `""`。

---

### 複雜度分析

* **時間複雜度：$O(N \cdot M \cdot 26)$**
  其中 $N$ 為 `str1` 的長度、$M$ 為 `str2` 的長度。對每個位置最多嘗試 26 個字母，每次嘗試需要檢查最多 $M$ 個涵蓋該位置的 'F' 窗口，每個窗口的子字串比對需 $O(M)$ 時間。整體為 $O(N \cdot M \cdot 26)$。

* **空間複雜度：$O(N + M)$**
  主要為結果字串 `ans` 的空間，長度為 $N + M - 1$。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    string generateString(string str1, string str2) {
        int n = str1.size(), m = str2.size();
        // 1. 初始化全為 '*' 的字串，省去 vector<char> 的轉換
        string ans(n + m - 1, '*');

        // 2. 處理所有的 'T'：強制覆蓋，遇到衝突直接 return ""
        for (int i = 0; i < n; i++) {
            if (str1[i] == 'T') {
                for (int j = 0; j < m; j++) {
                    if (ans[i + j] != '*' && ans[i + j] != str2[j]) return "";
                    ans[i + j] = str2[j];
                }
            }
        }

        // 3. 貪婪填入字典序最小的字元
        for (int i = 0; i < ans.size(); i++) {
            if (ans[i] == '*') {
                // 從 'a' 試到 'z'
                for (char c = 'a'; c <= 'z'; c++) {
                    ans[i] = c;
                    bool isValid = true;
                    
                    // 檢查這個字元會不會剛好湊滿某個 'F' 的限制 (只需檢查涵蓋 i 的 F)
                    for (int j = max(0, i - m + 1); j <= min(n - 1, i); j++) {
                        if (str1[j] == 'F' && ans.substr(j, m) == str2) {
                            isValid = false;
                            break;
                        }
                    }
                    if (isValid) break; // 這個字母安全，保留它並跳到下個位置
                }
            }
        }

        // 4. 最終防線：檢查原本的 'T' 是不是一開始就意外湊成了某個 'F'
        for (int i = 0; i < n; i++) {
            if (str1[i] == 'F' && ans.substr(i, m) == str2) return "";
        }

        return ans;
    }
};
```
