
# Leetcode-66. Plus One
## 題目說明
給定一個大整數，表示為整數數組 `digits`，其中每個 `digits[i]`是該整數的第`i`位元。這些數字按從左到右的順序從最高有效位元到最低有效位元排序。大整數不包含任何開頭為 `0`。

將大整數加一並傳回結果數字數組。
### 限制條件：
- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`
- 數字不包含任何開頭為 `0`。

## 解題思路
數學題:從數字的最低位（向量的末尾）開始檢查。
如果當前位小於 9，則增加一並立即返回。
如果當前位是 9，則將其設置為 0 並繼續檢查下一位。
如果遍歷完所有數字後都需要進位（即原數字每一位都是 9），則在向量前面插入一個 1。
這樣，即使是非常大的數字也可以正確處理，無需擔心整數溢出問題。
## 參考解法
```cpp title="C++" showLineNumbers {14,15}
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int n = digits.size();
        // 從最後一位開始進行加一操作
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                // 如果當前位小於 9，直接加一然後返回
                digits[i]++;
                return digits;
            }
            // 如果當前位是 9，則變為 0 並繼續循環
            digits[i] = 0;
        }
        // 如果所有位都是 9，例如 [9, 9, 9]，則需要增加一位並且最前面是 1
        digits.insert(digits.begin(), 1);
        return digits;
    }
};
```