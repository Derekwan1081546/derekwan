
# Leetcode-134. Gas Station
## 題目說明
有 `n` 個孩子站成一排。每個孩子都被分配一個在整數陣列 `ratings` 中給出的評級值。

您向這些兒童贈送糖果需符合以下要求：

每個孩子必須至少擁有一顆糖果。
評分較高的孩子比鄰居獲得更多醣果。
返回將糖果分發給孩子們所需的最少糖果數量。

範例1：

- 輸入：`ratings = [1,0,2]`
- 輸出：`5`
說明：您可以分別分配給第一個、第二個和第三個孩子 2、1、2 顆糖果。

範例2：

- 輸入：`ratings = [1,2,2]`
- 輸出：`4`
說明：您可以分別分配給第一個、第二個和第三個孩子 1、2、1 顆糖果。
第三個孩子因為滿足上述兩個條件而得到1塊糖果。

### 限制條件：
- `n == ratings.length`
- `1 <= n <= 2 * 10^4`
- `0 <= ratings[i] <= 2 * 10^4`

## 解題思路
第一次遍歷（從左到右）：
我們遍歷陣列，如果孩子的評分比前一個孩子高，就給這個孩子比前一個孩子多一顆糖果。這確保了左邊評分更高的孩子比左邊鄰居獲得更多的糖果。

第二次遍歷（從右到左）：
我們再遍歷一次，這次從右到左。如果一個孩子的評分比右邊的孩子高，那麼他的糖果數必須比右邊的多，所以我們更新糖果數量，取最大值（確保不會破壞第一次遍歷的結果）。

總糖果數量計算：
最後，遍歷糖果陣列，將每個孩子的糖果數加總返回。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        if (n == 0)
            return 0;

        vector<int> candies(n, 1);
        // 第一次遍歷：從左到右
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        // 第二次遍歷：從右到左
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = max(candies[i], candies[i + 1] + 1);
            }
        }
        // 計算糖果總數
        int sum = 0;
        for (auto& c : candies) {
            sum += c;
        }
        return sum;
    }
};
```