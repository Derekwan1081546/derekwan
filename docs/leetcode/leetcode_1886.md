
# Leetcode-1886. Determine Whether Matrix Can Be Obtained By Rotation
## 題目說明
給定兩個 `n x n` 二進位矩陣 `mat` 和 `target`，如果可以透過以 `90` 度順時針旋轉 `mat` 使 `mat` 等於 `target`，則傳回 `true`，否則傳回 `false`。
### 限制條件：
- `n == mat.length == target.length`
- `n == mat[i].length == target[i].length`
- `1 <= n <= 10`
- `mat[i][j]` 和 `target[i][j]` 為 `0` 或 `1`。
## 解題思路
首先定義一個函式`rotateMatrix`來執行矩陣旋轉90度，接著嘗試旋轉4次來檢查`mat` 是否等於 `target`，若相等則傳回 `true`，否則傳回 `false`。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    // 定義順時針旋轉 90 度的函數
    vector<vector<int>> rotateMatrix(const vector<vector<int>>& mat) {
        int n = mat.size();
        vector<vector<int>> rotated(
            n, vector<int>(n)); // n：這是外層向量的大小，即這個矩陣將會有 n
                                // 行。vector<int>(n)：這是內層向量的大小，即每一行都有
                                // n 個元素，並且初始值默認為 0（C++ 的 vector
                                // 在初始化時會將每個元素設置為 0）

        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                rotated[j][n - 1 - i] = mat[i][j];
            }
        }

        return rotated;
    }
    bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {
        // 嘗試旋轉四次（0 度，90 度，180 度，270 度）
        for (int i = 0; i < 4; ++i) {
            if (mat == target) {
                return true; // 如果兩個矩陣相等，返回 true
            }
            mat = rotateMatrix(mat); // 旋轉矩陣
        }
        return false; // 旋轉四次後仍然不相等，返回 false
    }
};
```