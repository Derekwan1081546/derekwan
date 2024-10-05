
# Leetcode-1937. Maximum Number of Points with Cost
## 題目說明
給定一個 `m x n` 整數矩陣點（0 索引）。從 0 點開始，您希望最大化可以從矩陣中獲得的點數。

要獲得分數，您必須在每一行中選擇一個儲存格。選擇座標 `(r, c)` 處的儲存格會將 `point[r][c]` 加到您的分數中。

但是，如果您選擇的儲存格距離您在上一行中選擇的儲存格太遠，您將失去分數。對於每兩個相鄰行`r` 和`r + 1`（其中`0 <= r < m - 1`），選取座標`(r, c1)` 和`(r + 1, c2)` 處的儲存格將從分數中減去`abs (c1 - c2)` 。

傳回您可以獲得的最大分數。

`abs(x)` 定義為：

`x` 表示 `x >= 0`。
`-x` 表示 `x < 0`。

### 限制條件：
- `m == points.length`
- `n == points[r].length`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 10^5`
- `0 <= points[r][c] <= 10^5`

## 解題思路
我們需要找到一種更複雜的方式來考慮每行之間選擇的值。簡單地選擇每一行的最大值並扣除列差的絕對值並不足以解決這個問題。我們應該考慮列與列之間的跨越影響，找出每一行中從上一行跨到目前行可能的最大值。

思路：
對於每一行，嘗試從上一行的每個位置跳到當前行的每個位置，並且計算每個跳躍的得分和列差的懲罰。
使用`動態規劃（DP）`思想來保存從上一行跳到目前行的最大得分。

動態規劃解決方案：
初始化一個數組，表示前一行中每個列的最大得分。
對於每一行，逐列遍歷，並更新當前列的最大得分，考慮從上一行的每一列跳到當前列的得分，並加上列差懲罰。
每一行計算完成後，將目前行的最大得分儲存為下一行的前一行得分。

累積最大值處理：

為了處理列差的問題，我們需要考慮兩個方向的累積最大值：

- 從左到右：計算從左到右跳到目前列的可能最大得分，並且每跳一個列，得分減1。

- 從右到左：計算從右往左跳到目前列的可能最大得分，也需要考慮跨列的懲罰。

左到右和右到左最大值的比較：

對於每一行的每一列，我們將從左到右和從右到左的最大值與該列的得分相加，選擇最大的得分作為該列的最大可能得分。

動態更新：

每一行完成後，目前行的最大得分會成為下一行的前一行得分，繼續進行累積計算。

複雜度分析：
- 時間複雜度：O(n * m)，其中 n 是行數，m 是列數。我們需要遍歷每個元素，並為每一行進行兩次掃描來計算左右方向的最大值。
- 空間複雜度：O(m)，因為我們只需要額外的空間來儲存每一行的最大得分以及左右方向的累積最大值。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    long long maxPoints(vector<vector<int>>& points) {
        int rows = points.size();
        int cols = points[0].size();

        // 前一行的最大得分
        vector<long long> prevMax(cols, 0);

        // 初始化第一行的得分
        for (int j = 0; j < cols; j++) {
            prevMax[j] = points[0][j];
        }

        // 從第二行開始，逐行計算最大得分
        for (int i = 1; i < rows; i++) {
            // 儲存當前行的最大得分
            vector<long long> currMax(cols, 0);

            // 從左到右的累積最大值
            vector<long long> leftMax(cols, 0);
            leftMax[0] = prevMax[0];
            for (int j = 1; j < cols; j++) {
                leftMax[j] = max(leftMax[j - 1] - 1, prevMax[j]);
            }

            // 從右到左的累積最大值
            vector<long long> rightMax(cols, 0);
            rightMax[cols - 1] = prevMax[cols - 1];
            for (int j = cols - 2; j >= 0; j--) {
                rightMax[j] = max(rightMax[j + 1] - 1, prevMax[j]);
            }

            // 計算當前行的最大得分
            for (int j = 0; j < cols; j++) {
                currMax[j] = points[i][j] + max(leftMax[j], rightMax[j]);
            }

            // 更新為下一行的前一行最大得分
            prevMax = currMax;
        }

        // 返回最後一行中的最大值
        return *max_element(prevMax.begin(), prevMax.end());
    }
};
```