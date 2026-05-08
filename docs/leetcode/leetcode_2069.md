
# Leetcode-2069. Walking Robot Simulation II
## 題目說明
一個 `width x height` 的網格位於 XY 平面上，左下角為 `(0, 0)`，右上角為 `(width - 1, height - 1)`。機器人初始位於 `(0, 0)` 並面朝 **East**。

機器人可以被指示移動特定步數。每一步：
1. 嘗試向當前方向前進一格。
2. 若下一格超出邊界，機器人**逆時針轉 90 度**並重試該步。

實作 `Robot` 類別：
- `Robot(int width, int height)`：初始化網格，機器人位於 `(0, 0)` 面朝 East。
- `void step(int num)`：指示機器人前進 `num` 步。
- `int[] getPos()`：回傳機器人當前座標 `[x, y]`。
- `String getDir()`：回傳機器人當前方向。

### 限制條件：
- `2 <= width, height <= 100`。
- `1 <= num <= 10^5`。
- `step`、`getPos`、`getDir` 總共最多呼叫 `10^4` 次。

## 解題思路

關鍵觀察：機器人只沿著網格的**外圈邊緣**移動（因為碰到邊界就轉向）。外圈周長為 `2*(width-1) + 2*(height-1)`。因此可以將機器人的位置簡化為「在周長軌道上的第幾格」。

### 演算法步驟

1. **計算周長**：`perimeter = 2*(w-1) + 2*(h-1)`，機器人永遠在這條環形軌道上移動。

2. **step(num)**：直接 `current_pos = (current_pos + num) % perimeter`，用取餘數避免模擬每一步。標記 `has_moved = true`。

3. **getPos()**：根據 `current_pos` 判斷位於軌道的哪一段：
   - `[0, w-1)`：下邊緣，座標 `(pos, 0)`。
   - `[w-1, w+h-2)`：右邊緣，座標 `(w-1, pos-(w-1))`。
   - `[w+h-2, 2w+h-3)`：上邊緣，座標 `(w-1-(pos-(w+h-2)), h-1)`。
   - `[2w+h-3, perimeter)`：左邊緣，座標 `(0, h-1-(pos-(2w+h-3)))`。

4. **getDir()**：根據所在邊緣回傳對應方向（下=East、右=North、上=West、左=South）。**特殊處理**：若 `current_pos == 0` 且已移動過，方向為 South（從左邊緣走回原點）。

---

### 複雜度分析

* **時間複雜度：每次 `step`、`getPos`、`getDir` 皆為 $O(1)$**。
* **空間複雜度：$O(1)$**，僅儲存幾個整數變數。

## 參考解法
```cpp title="C++" showLineNumbers
class Robot {
private:
    int w, h;
    int perimeter;   // 軌道總周長
    int current_pos; // 機器人目前在軌道上的位置 (0 到 perimeter - 1)
    bool has_moved;  // 標記機器人是否曾經移動過 (處理 (0,0) 的方向陷阱)

public:
    // 1. 初始化
    Robot(int width, int height) {
        w = width;
        h = height;
        // 計算周長：上邊 + 下邊 + 左邊 + 右邊 - 4個重複算的角落
        perimeter = 2 * (w - 1) + 2 * (h - 1);
        current_pos = 0;
        has_moved = false;
    }

    // 2. 移動步數
    void step(int num) {
        has_moved = true; // 只要呼叫了 step，標記為已移動
        // 核心優化：直接對周長取餘數，省略無意義的繞圈圈
        current_pos = (current_pos + num) % perimeter;
    }

    // 3. 取得目前座標
    vector<int> getPos() {
        // 在原點
        if (current_pos == 0) {
            return {0, 0};
        }
        // 在下邊緣 (往右走)
        else if (current_pos < w) {
            return {current_pos, 0};
        }
        // 在右邊緣 (往上走)
        else if (current_pos < w + h - 1) {
            return {w - 1, current_pos - (w - 1)};
        }
        // 在上邊緣 (往左走)
        else if (current_pos < 2 * w + h - 2) {
            return {w - 1 - (current_pos - (w + h - 2)), h - 1};
        }
        // 在左邊緣 (往下走)
        else {
            return {0, h - 1 - (current_pos - (2 * w + h - 3))};
        }
    }

    // 4. 取得目前方向
    string getDir() {
        // 大魔王陷阱：如果停在原點，根據是否移動過來決定方向
        if (current_pos == 0) {
            return has_moved ? "South" : "East";
        }
        // 在下邊緣
        else if (current_pos < w) {
            return "East";
        }
        // 在右邊緣
        else if (current_pos < w + h - 1) {
            return "North";
        }
        // 在上邊緣
        else if (current_pos < 2 * w + h - 2) {
            return "West";
        }
        // 在左邊緣
        else {
            return "South";
        }
    }
};

/**
 * Your Robot object will be instantiated and called as such:
 * Robot* obj = new Robot(width, height);
 * obj->step(num);
 * vector<int> param_2 = obj->getPos();
 * string param_3 = obj->getDir();
 */
```
