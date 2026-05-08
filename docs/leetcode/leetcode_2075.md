
# Leetcode-2075. Decode the Slanted Ciphertext
## 題目說明
一個原始字串 `originalText` 使用**斜向置換密碼**（slanted transposition cipher）編碼為字串 `encodedText`，編碼過程使用一個固定列數 `rows` 的矩陣。

**編碼過程**：
1. 將 `originalText` 以**左上到右下對角線**的方式依序填入矩陣。
2. 空餘的格子填入空格 `' '`。欄數的選擇確保最右欄在填入後不會全為空。
3. `encodedText` 由矩陣**逐列（row-wise）**串接所有字元而成。

給定編碼後的字串 `encodedText` 和列數 `rows`，回傳原始字串 `originalText`。

**注意**：`originalText` 不包含尾端空格。測試資料保證只有唯一的 `originalText`。

### 限制條件：
- `0 <= encodedText.length <= 10^6`。
- `encodedText` 僅包含小寫英文字母和空格 `' '`。
- `1 <= rows <= 1000`。
- 測試資料保證只有唯一的 `originalText`。

## 解題思路

解碼過程為編碼的逆操作。編碼時原文沿對角線填入矩陣，解碼時只需沿對角線讀回即可。

### 演算法步驟

1. **計算欄數**：`cols = encodedText.size() / rows`，因為 `encodedText` 是矩陣逐列串接而成。

2. **沿對角線讀取**：外層迴圈遍歷每一欄 `i`（`0` 到 `cols-1`）作為對角線的起點。從位置 `current = i` 開始，每次跳 `cols + 1`（即下一列的下一欄），直到超出字串範圍。將讀到的字元依序加入結果字串。

3. **移除尾端空格**：解碼後的字串可能有多餘的尾端空格，逐一 `pop_back()` 移除。

---

### 複雜度分析

* **時間複雜度：$O(n)$**，其中 $n$ 為 `encodedText` 的長度，每個字元最多被讀取一次。
* **空間複雜度：$O(n)$**，用於儲存結果字串。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    string decodeCiphertext(string encodedText, int rows) {
        int s = encodedText.size();
        int cols = s / rows;
        string str = "";
        for (int i = 0; i < cols; i++) {
            int current = i;
            while (current < s) {
                str += encodedText[current];
                current += cols + 1;
            }
        }
        // 刪除字串「尾端」多餘的空格 (Trailing spaces)
        // 注意：必須確保字串不為空 (!str.empty()) 才能使用 back() 和 pop_back()
        while (!str.empty() && str.back() == ' ') {
            str.pop_back();
        }
        return str;
    }
};
```
