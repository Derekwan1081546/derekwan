
# Leetcode-3453. Separate Squares I
## 題目說明
給定一個二維整數數組 `squares`。每個 `squares[i] = [xi, yi, li]` 表示平行於 `x` 軸的正方形的左下角座標和邊長。

求一條水平線的最小 `y` 座標值，使得該線上方正方形的總面積等於該線下方正方形的總面積。

答案誤差在 `10⁻⁵` 以內均可接受。

注意：正方形可能重疊。重疊的面積需要重複計算。

### 限制條件：
- `1 <= squares.length <= 5 * 104`。
- `squares[i] = [xi, yi, li]`。
- `squares[i].length == 3`。
- `0 <= xi, yi <= 109`。
- `1 <= li <= 109`。
- 所有正方形的總面積不會超過 `10^12`。

## 解題思路
第一步，是先計算所有正方形的總面積，因為我們需要知道「一半面積」的確切數值作為之後的比較目標。同時也可以順便確定搜尋範圍：線的高度不可能低於所有正方形的最低 y 座標，也不可能高於所有正方形的最高邊界 y + 邊長。這樣就能把答案限制在一個合理的區間內。

接著使用二分搜尋來找答案。原因是，當水平線往上移時，線下方的面積一定是單調遞增的：線越高，包含在下方的正方形面積只會越多，不可能變少。這個「單調性」正是二分搜尋能成立的關鍵。

在二分搜尋的每一步，我們會取目前區間的中點 `mid`，假設水平線位在 `y = mid`，然後計算這條線下方的面積。對於每一個正方形，都可以分成三種情況來處理：如果整個正方形都在這條線上方，那它對下方面積沒有任何貢獻；如果整個正方形都在這條線下方，則貢獻完整的正方形面積；如果正方形被這條線切過，則只計算被切到的下半部分面積，也就是「被覆蓋的高度乘上邊長」。

把所有正方形的貢獻加總後，就能得到目前這條線下方的總面積，並與「目標的一半面積」進行比較。如果下方面積已經大於或等於一半，代表這條線偏高或剛好，搜尋區間就往下縮；反之，如果下方面積還不夠，代表線還太低，搜尋區間就往上移。

由於答案是浮點數，沒有辦法用傳統的 `left ≤ right` 來結束，因此改用固定次數的迴圈來逼近答案。每次二分都會把誤差縮小一半，重複約 100 次後，精度已經足以通過題目要求。

時間複雜度方面，假設有 `n` 個正方形，每一次二分搜尋都需要掃描所有正方形來計算面積，因此單次成本是 `O(n)`。二分搜尋進行固定次數（例如 100 次），可以視為常數，所以整體時間複雜度是 `O(n)`。

空間複雜度方面，除了輸入資料本身之外，只使用了少數幾個變數來記錄面積與搜尋區間，沒有使用額外與 `n` 成正比的結構，因此空間複雜度是 `O(1)`。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    double separateSquares(vector<vector<int>>& squares) {
        // 1. 計算總面積並確定搜尋範圍
        double totalArea = 0;
        double min_y = 2e9, max_y = 0;
        
        for(auto& sq : squares) {
            double y = sq[1];
            double l = sq[2];
            totalArea += (long long)l * l; // 防止溢位，轉成 long long 再加
            min_y = min(min_y, y);
            max_y = max(max_y, y + l);
        }
        
        double target = totalArea / 2.0;
        
        // 2. 二分搜尋 (Binary Search)
        // 範圍：[min_y, max_y]
        // 由於是浮點數，我們使用固定的迴圈次數來保證精度 (通常 60~100 次足夠達到 1e-5 以上的精度)
        double left = min_y, right = max_y;
        
        for(int i = 0; i < 100; i++) {
            double mid = left + (right - left) / 2.0;
            
            // 3. 計算 y = mid 這條線下方的面積
            double currentAreaBelow = 0;
            for(auto& sq : squares) {
                double y = sq[1];
                double l = sq[2];
                
                if (y >= mid) {
                    // 情況 A: 正方形完全在線上方 -> 貢獻 0
                    continue;
                } else if (y + l <= mid) {
                    // 情況 B: 正方形完全在線下方 -> 貢獻全部面積
                    currentAreaBelow += l * l;
                } else {
                    // 情況 C: 正方形被線切開 -> 貢獻下半部
                    // 下半部高度 = mid - y
                    currentAreaBelow += (mid - y) * l;
                }
            }
            
            // 4. 判斷並縮小範圍
            if (currentAreaBelow >= target) {
                // 下方面積太大，線要往下移
                right = mid;
            } else {
                // 下方面積太小，線要往上移
                left = mid;
            }
        }
        
        return right; // 回傳 left 或 right 都可以，因為非常接近
    }
};
```