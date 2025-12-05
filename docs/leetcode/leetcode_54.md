
# Leetcode-54. Spiral Matrix
## 題目說明
給定一個 `m × n` 矩陣，以螺旋順序傳回矩陣的所有元素。

給定一個整數數組 `nums`。 您最初位於數組的第一個索引處，數組中的每個元素代表您在該位置的最大跳躍長度。

如果可以到達最後一個索引，則傳回 `true`，否則傳回 `false`。
### 限制條件：
- `m == matrix.length`。
- `n == matrix[i].length`。
- `1 <= m, n <= 10`。
- `-100 <= matrix[i][j] <= 100`。

## 解題思路
1. 初始化邊界
定義四個指標控制矩形邊界：
    - `top`：上邊界，初始為 0
    - `bottom`：下邊界，初始為矩陣最後一行
    - `left`：左邊界，初始為 0
    - `right`：右邊界，初始為矩陣最後一列

2. 循環遍歷矩形
使用 `while (top <= bottom && left <= right)` 循環，當矩形還存在時進行遍歷。

3. 按螺旋順序遍歷矩形的四條邊
    - 從左到右：遍歷上邊界的一行，然後上邊界 `top` 下移一行。
    - 從上到下：遍歷右邊界的一列，然後右邊界 `right` 左移一列。
    - 從右到左：遍歷下邊界的一行（先判斷是否還存在矩形），然後下邊界 `bottom` 上移一行。
    - 從下到上：遍歷左邊界的一列（先判斷是否還存在矩形），然後左邊界 `left` 右移一列。

4. 收縮矩形
每走完一圈，上下左右邊界收縮，逐層向內遍歷。

5. 結束條件
當 `top > bottom` 或 `left > right` 時停止循環，整個矩陣遍歷完成。

6. 返回結果
將遍歷過的元素按螺旋順序存入結果列表並返回。

這個算法的核心思想就是：
    `用四個邊界指針控制當前矩形，逐層螺旋遍歷矩形的上下左右邊界，邊界收縮直到矩形消失。`

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> result;
        if (matrix.empty())
            return result;

        int top = 0;
        int bottom = matrix.size() - 1;
        int left = 0;
        int right = matrix[0].size() - 1;
        while (top <= bottom && left <= right) {
            // 從左到右
            for (int j = left; j <= right; j++)
                result.push_back(matrix[top][j]);
            top++; // 下一層
            // 從上到下
            for (int i = top; i <= bottom; i++) {
                result.push_back(matrix[i][right]);
            }
            right--; // 往左移
            // 從右到左（注意邊界）
            if (top <= bottom) {
                for (int j = right; j >= left; j--)
                    result.push_back(matrix[bottom][j]);
                bottom--; // 下邊界上移
            }
            // 從下到上（注意邊界）
            if (left <= right) {
                for (int i = bottom; i >= top; i--)
                    result.push_back(matrix[i][left]);
                left++; // 左邊界右移
            }
        }
        return result;
    }
};
```