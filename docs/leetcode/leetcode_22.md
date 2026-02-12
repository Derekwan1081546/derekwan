
# Leetcode-22. Generate Parentheses
## 題目說明
給定 `n` 對括號，寫一個函數來產生所有格式正確的括號組合。

### 限制條件：
- `1 <= n <= 8`。

## 解題思路

### 1. 核心思想：回溯法 (Backtracking)
這題可以看作是一個「構建字串」的過程。我們有一個空字串，每個位置只能填入 `(` 或 `)`。
為了保證括號是合法的，我們不能隨意填入，必須遵守兩個關鍵規則。

### 2. 關鍵限制條件 (Constraints)
在遞迴過程中，我們維護兩個變數：`open` (已放入的左括號數) 和 `close` (已放入的右括號數)。

* **規則一：什麼時候可以放左括號 `(` ？**
  * 只要 **`open < n`**，我們隨時可以放左括號。
  * 因為左括號是開啟一個新的層級，只要總數不超過題目給定的 $n$，它總是合法的開始。

* **規則二：什麼時候可以放右括號 `)` ？**
  * 只有當 **`close < open`** 時，才能放右括號。
  * **這是本題最關鍵的邏輯**。這代表目前字串中，還有「未被匹配」的左括號。
  * 如果 `close == open`，代表所有左括號都已經閉合了，此時如果再放右括號就會變成無效格式（如 `())`），所以必須禁止。

### 3. 程式碼邏輯詳解

#### 函數參數設計
```cpp
void backtrack(vector<string>& result, string& current, int open, int close, int max)
```
* `result`: 最終存放答案的容器。
* `current`: 當前正在構建的字串（使用 `string&` 引用傳遞以節省記憶體）。
* `open`, `close`: 狀態變數，記錄目前用了多少個括號。
* `max`: 即題目輸入的 $n$。

#### 終止條件 (Base Case)
```cpp
if (current.length() == max * 2) {
    result.push_back(current);
    return;
}
```
* 因為要有 $n$ 個左括號和 $n$ 個右括號，所以當字串長度達到 $2n$ 時，代表一組有效的括號生成完畢，將其加入結果集並返回。

#### 決策路徑 (Decision Tree)

**路徑 A：嘗試放左括號**
```cpp
if (open < max) {
    current.push_back('(');                     // 1. 做選擇
    backtrack(result, current, open + 1, close, max); // 2. 進入下一層遞迴
    current.pop_back();                         // 3. 回溯 (撤銷選擇)
}
```
* 這裡使用了顯式的 **回溯 (Backtracking)**。
* 因為 `current` 是引用傳遞 (Pass by Reference)，在遞迴返回後，必須把剛剛加進去的 `(` 拿掉 (`pop_back`)，才能讓程式回到原本的狀態，去嘗試「路徑 B」。

**路徑 B：嘗試放右括號**
```cpp
if (close < open) {
    current.push_back(')');                     // 1. 做選擇
    backtrack(result, current, open, close + 1, max); // 2. 進入下一層遞迴
    current.pop_back();                         // 3. 回溯 (撤銷選擇)
}
```
* 同理，嘗試放右括號後，遞迴結束也需要 `pop_back` 來恢復現場。

---

### 4. 遞迴樹視覺化 (以 n=2 為例)

這個過程可以想像成一棵樹的生長：

```text
                        "" (0, 0)
                       /
                     "(" (1, 0)
                    /          \
           "((" (2, 0)        "()" (1, 1)
              /                  \
      "(()" (2, 1)              "()(" (2, 1)
          /                        \
  "(())" (2, 2) -> 加入結果       "()()" (2, 2) -> 加入結果
```
* 注意：在 `((` (2, 0) 的狀態下，`close < open` (0 < 2) 成立，所以可以走右邊分支放 `)`。
* 但在 `()` (1, 1) 的狀態下，`close < open` (1 < 1) **不成立**，所以不能放 `)` 變成 `())`，這條路被剪枝了。

### 5. 複雜度分析
* **時間複雜度**：$O(\frac{4^n}{\sqrt{n}})$。這與卡特蘭數 (Catalan Number) 有關，簡單來說是指數級別的，但因為剪枝的關係，比暴力的 $2^{2n}$ 快得多。
* **空間複雜度**：$O(n)$。主要是遞迴堆疊 (Recursion Stack) 的深度，最深為 $2n$。

---

### 總結
這段代碼是 **DFS + 剪枝** 的標準模板。
1.  **DFS**：透過遞迴不斷嘗試往下填字元。
2.  **剪枝**：透過 `open < max` 和 `close < open` 這兩個條件，將不合法的路徑提早砍掉，只保留有效的括號組合。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string current;
        backtrack(result, current, 0, 0, n);
        return result;
    }

private:
    // open: 目前已經放入的左括號數量
    // close: 目前已經放入的右括號數量
    // max: 總共需要的括號對數 (n)
    void backtrack(vector<string>& result, string& current, int open, int close, int max) {
        // 終止條件：當字串長度達到 2 * n，代表一組解生成完畢
        if (current.length() == max * 2) {
            result.push_back(current);
            return;
        }

        // 決策 1：只要左括號還沒用完，就可以放左括號
        if (open < max) {
            current.push_back('(');
            backtrack(result, current, open + 1, close, max);
            current.pop_back(); // 回溯：撤銷選擇，嘗試其他可能性
        }

        // 決策 2：只有在「目前右括號數量 < 目前左括號數量」時，才能放右括號
        // 這是確保括號合法的關鍵 (避免出現 "())" 這種情況)
        if (close < open) {
            current.push_back(')');
            backtrack(result, current, open, close + 1, max);
            current.pop_back(); // 回溯
        }
    }
};
```