
# Leetcode-933. Number of Recent Calls
## 題目說明
有一個 `RecentCounter class`，用於計算特定時間範圍內的最近請求數。

實作 `RecentCounter class`：

- `RecentCounter()` 用零個最近請求初始化計數器。
- `int ping(int t)` 在時間 `t` 新增一個新請求，其中 `t` 表示某個時間（以毫秒為單位），並傳回過去 `3000` 毫秒內發生的請求數（包括新請求）。具體來說，傳回 `[t - 3000, t]` 範圍內發生的請求數。

保證每次 ping 調用都使用比前一次調用嚴格更大的 `t` 值。

### 限制條件：
- `1 <= t <= 109`
- 每個測試案例都會使用嚴格遞增的 `t` 值來呼叫 `ping`。
- 最多將進行 `104` 次 `ping` 呼叫。
## 解題思路
- `RecentCounter class`：

    `requests` 變數：使用一個 queue<int> 來儲存請求的時間。`Queue`適合這種情況，因為它遵循先進先出（FIFO）原則，可以方便地移除不符合時間範圍的請求。
- `ping` 函式：

    接收一個整數參數 `t`，表示某個請求的時間（毫秒）。
    `requests.push(t)`：將該請求時間 `t` 推入`Queue`。
    清理過期請求：使用 `while` 迴圈，當`Queue`最前面的請求時間小於 `t - 3000` 時（即超過 `3000` 毫秒之前的請求），將其移除。這樣 `Queue` 中只會保留最近 `3000` 毫秒內的請求。
    返回結果：最後返回 `Queue` 的大小，即最近 `3000` 毫秒內的請求數量。
- 使用方式：
    使用 `RecentCounter` 類別時，首先建立一個 `RecentCounter` 對象，然後可以反覆調用 `ping(t)`，每次傳入請求的時間 `t`，函式會返回最近 `3000` 毫秒內的請求數量。
    
時間複雜度：
每次調用 `ping(t)` 時，只有可能移除過期的請求，這些操作都是 `O(1)` 的，因此整體時間複雜度接近 `O(1)` 平均運行時間。
## 參考解法
```cpp title="C++" showLineNumbers
class RecentCounter {
private:
    std::queue<int> requests;

public:
    RecentCounter() {}

    int ping(int t) {
        requests.push(t);
        while (!requests.empty() && requests.front() < t - 3000) {
            requests.pop();
        }
        return requests.size();
    }
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * RecentCounter* obj = new RecentCounter();
 * int param_1 = obj->ping(t);
 */
```