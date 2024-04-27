
# Leetcode-202. Happy Number
## 題目說明
寫一個演算法來確定數字 `n` 是否為 `happy number(快樂數)`。

`happy number(快樂數)`是由下列過程定義的數：

從任何正整數開始，將數字替換為其數字的平方和。
重複該過程，直到數字等於 `1`（它將停留在該位置），或在不包含 `1` 的循環中無限循環。
此過程以 `1` 結尾的數字是滿意的。
如果 `n` 是快樂的數字，則傳回 `true`，否則傳回 `false`。
### 限制條件：
- `1 <= n <= 2^31 - 1`

## 解題思路
持續計算一個數字的每一位數的平方和，直到該數字等於 `1` 或者進入一個已知的循環。利用 `unordered_set` 來檢查是否已經出現過某個數字，如果出現過，表示它已經進入循環，不是快樂數。如果最終變為 `1`，則該數字為快樂數。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> visited;
        while (n != 1 && visited.find(n) == visited.end()) {
            visited.insert(n);
            int result = 0;
            while (n > 0) {
                int digit = n % 10;
                result += digit * digit;
                n /= 10;
            }
            n = result;
        }
        return n == 1;
    }
};
```