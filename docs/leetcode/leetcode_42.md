
# Leetcode-42. Trapping Rain Water
## 題目說明
給定 n 個非負整數表示高程圖，其中每個長條的寬度為 1，計算下雨後該高程圖可以收集多少水。

### 限制條件：
- `n == height.length`。
- `1 <= n <= 2 * 10^4`。
- `0 <= height[i] <= 10^5`。

## 解題思路

這題的核心物理觀念是：**一個位置能存多少水，取決於它「左邊最高的牆」和「右邊最高的牆」之中較矮的那一個，減去它自身的高度。**

我們採用 **雙指針法 (Two Pointers)** 來解決，這是一個空間效率最高的解法：

1.  **定義指針與變數**：
    * `left` 指向陣列開頭，`right` 指向陣列結尾。
    * `leftMax` 記錄左邊目前遇過的最高牆，`rightMax` 記錄右邊目前遇過的最高牆。

2.  **向內夾擊 (核心邏輯)**：
    我們比較 `height[left]` 和 `height[right]`：
    * **短板效應 (Bucket Effect)**：水位的上限受限於較矮的那一邊。
    * 如果 `height[left] < height[right]`：
        * 這表示「左邊」是短板。雖然我們不知道 `left` 和 `right` 中間有沒有更高的牆，但我們確定右邊**至少**有一個 `height[right]` 比左邊高。因此，當前 `left` 位置能裝多少水，完全取決於 `leftMax`。
        * 如果 `height[left] < leftMax`，則積水量為 `leftMax - height[left]`。
        * 如果 `height[left] >= leftMax`，更新 `leftMax`（無法積水）。
        * 處理完後，`left` 向右移動。
    * 反之 (`height[left] >= height[right]`)：
        * 表示「右邊」是短板。原理同上，我們處理右邊的指針，計算積水或更新 `rightMax`，並將 `right` 向左移動。

3.  **重複執行**：直到 `left` 與 `right` 相遇。

---

### 複雜度分析

* **時間複雜度：$O(N)$**
    我們使用雙指針遍歷整個陣列一次，每個元素只會被訪問處理一次。

* **空間複雜度：$O(1)$**
    只使用了常數個變數 (`left`, `right`, `leftMax`, `rightMax`, `ans`)，不需要像動態規劃解法那樣建立額外的陣列來存儲前後綴最大值。
## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n == 0)
            return 0;

        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int ans = 0;

        while (left < right) {
            // 比較兩端的高度，決定處理哪一邊
            // 根據「短板效應」，水的高度取決於較矮的那一邊
            if (height[left] < height[right]) {
                // --- 處理左邊 ---
                if (height[left] >= leftMax) {
                    // 更新左邊最高牆 (無法積水，因為這是目前最高的)
                    leftMax = height[left];
                } else {
                    // 計算積水：左邊最高牆 - 當前高度
                    ans += leftMax - height[left];
                }
                left++; // 指針向右移
            } else {
                // --- 處理右邊 ---
                if (height[right] >= rightMax) {
                    // 更新右邊最高牆
                    rightMax = height[right];
                } else {
                    // 計算積水：右邊最高牆 - 當前高度
                    ans += rightMax - height[right];
                }
                right--; // 指針向左移
            }
        }
        return ans;
    }
};
```