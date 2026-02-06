
# Leetcode-744. Find Smallest Letter Greater Than Target
## 題目說明
給定一個按非遞減順序排序的字元數組 `letters` 和一個目標字元 `target`。 `letters` 中至少包含兩個不同的字元。

傳回 `letters` 中字典序大於 `target` 的最小字元。如果不存在這樣的字符，則傳回 `letters` 中的第一個字符。

### 限制條件：
- `2 <= letters.length <= 104`

- `letters[i]` 是一個小寫英文字母。

- `letters` 已按非遞減順序排序。

- `letters` 至少包含兩個不同的字元。

- `target` 是一個小寫英文字母。

## 解題思路

這段程式碼採用的是 **線性掃描 (Linear Scan)** 的方法。由於題目給定的 `letters` 陣列已經是 **非遞減排序 (Sorted)** 的，我們只需要依序尋找即可。

1.  **遍歷陣列**：
    使用 `for` 迴圈從頭開始檢查 `letters` 中的每一個字元 `n`。

2.  **尋找大於目標的字元**：
    在迴圈中判斷 `if (n > target)`。因為陣列是排序過的，所以我們遇到的**第一個**比 `target` 大的字元，就一定是我們要找的「最小的大於 `target` 的字元」。一旦找到，立即回傳該字元。

3.  **處理循環情況 (Wrap Around)**：
    如果迴圈執行完畢都沒有回傳任何值，代表 `letters` 中的所有字元都小於或等於 `target`（例如 `letters = ['a', 'b'], target = 'z'`）。根據題目要求（視為循環陣列），此時應該回傳陣列的第一個元素 `letters[0]`。

---

### 複雜度分析

* **時間複雜度：$O(N)$**
    其中 $N$ 是陣列的長度。在最壞的情況下（`target` 比所有字元都大），我們需要遍歷整個陣列一次。
    *(註：由於陣列是排序的，此題其實也可以用二分搜尋法優化至 $O(\log N)$，但這段程式碼使用的是 $O(N)$ 的解法。)*

* **空間複雜度：$O(1)$**
    只使用了迴圈變數，沒有使用額外的資料結構，記憶體使用量為常數。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    char nextGreatestLetter(vector<char>& letters, char target) {
        for (auto& n : letters) {
            if (n > target) {
                return n;
            }
        }
        return letters[0];
    }
};
```