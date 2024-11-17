
# Leetcode-1927. Sum Game
## 題目說明
Alice 和 Bob 輪流玩遊戲，Alice 首先開始。

給你一個偶數長度的字串 num，由數字和 `?` 組成人物。在每一回合中，如果仍然至少有一個 `?`，玩家將執行以下操作數量：

選擇索引 `i`，其中 `num[i] == '?'`。
將 `num[i]` 替換為`0`和`9`之間的任意數字。
當不再有`？`時遊戲結束。 `num` 中的字符

為了讓 Bob 獲勝，`num` 前半部的數字總和必須等於後半部的數字總和。為了讓Alice獲勝，總和必須不相等。

例如，如果遊戲以 `num =“243801”`結束，則 Bob 獲勝，因為 `2+4+3 = 8+0+1`。如果遊戲以 `num = "243803"` 結束，那麼 Alice 獲勝，因為 `2+4+3 != 8+0+3`。
假設 Alice 和 Bob 表現最佳，如果 Alice 獲勝則回傳 `true`，如果 Bob 獲勝則回傳 `false`。



- 範例1：

    輸入：數字=“5023”
    輸出：false
    說明： 無需採取任何行動。
    前半部總和等於後半部總和：5 + 0 = 2 + 3。

- 範例2：

    輸入：num =“25??”
    輸出：true
    解釋：Alice 可以用“9”替換其中一個“？”，而 Bob 不可能使總和相等。

- 範例3：

    輸入：num = "?3295???"
    輸出：false
    解釋：可以證明Bob永遠會贏。一種可能的結果是：
    - Alice 替換了第一個“？”與“9”。數字=“93295？？？”。
    - Bob替換了其中一個“？”在右半部有“9”。數字=“932959??”。
    - Alice 替換了其中一個“？”右半部帶有“2”。數字=“9329592？”。
    - Bob替換了最後一個“？”在右半部有“7”。數字=“93295927”。
    Bob贏了，因為 9 + 3 + 2 + 9 = 5 + 9 + 2 + 7。

### 限制條件：
- `2 <= num.length <= 10^5`
- `num.length` 是偶數。
- `num` 僅由數字和 `?` 組成。

## 解題思路
這題要求判斷 Alice 是否能在數字遊戲中獲勝。字串 `num` 被分成左右兩部分，雙方輪流將 `'?'` 替換成數字。Alice 先手，目標是讓遊戲無法平衡，而 Bob 的目標是平衡兩部分的和。

解題的核心思路是：
1. 計算左右兩部分的數字和及 `'?'` 的數量。
2. 如果 `'?'` 的總數是奇數，Alice 總能在最後一手確保不平衡，因此 Alice 獲勝。
3. 如果 `'?'` 是偶數，計算左右數字和的差異，並考慮雙方替換 `'?'` 的策略（Alice 最大化影響、Bob 最小化影響）。若最終差異不為 0，Alice 可以確保無法平衡，因此獲勝；否則 Bob 可以平衡，Alice 無法獲勝。

## 參考解法
```cpp title="C++" showLineNumbers
class Solution {
public:
    bool sumGame(string num) {
        int n = num.size(); // 取得字串長度
        int half = n / 2;   // 將字串分成前後兩部分

        int left_sum = 0, right_sum = 0; // 前半部分和後半部分的數字和
        int left_question_marks = 0,
            right_question_marks = 0; // 前半部分和後半部分的 '?' 數量

        // 遍歷前半部分字串，累加數字和，並計算 '?' 的數量
        for (int i = 0; i < half; i++) {
            if (num[i] == '?') {
                left_question_marks++; // 如果是 '?'，增加左側的計數
            } else {
                left_sum += num[i] - '0'; // 累加數字
            }
        }

        // 遍歷後半部分字串，累加數字和，並計算 '?' 的數量
        for (int i = half; i < n; i++) {
            if (num[i] == '?') {
                right_question_marks++; // 如果是 '?'，增加右側的計數
            } else {
                right_sum += num[i] - '0'; // 累加數字
            }
        }

        // 檢查總共有多少個 '?'
        if ((left_question_marks + right_question_marks) % 2 == 1) {
            // 如果總共有奇數個 '?'，Alice
            // 會有最後一手，可以決定遊戲結束時兩部分不相等 因此，Alice
            // 總是能獲勝
            return true;
        }

        // 計算數字和的差異
        int sum_diff = left_sum - right_sum;

        // 計算 Alice 和 Bob 替換 '?' 時的影響：
        // - 左半部分有 left_question_marks 個 '?'，其中一半是 Alice
        // 換，另一半是 Bob 換
        // - 右半部分有 right_question_marks 個 '?'，其中一半是 Alice
        // 換，另一半是 Bob 換
        // - Alice 會最大化差異，因此會將 '?' 換成 9；而 Bob 會最小化差異
        int ans = sum_diff + (left_question_marks / 2) * 9 -
                  (right_question_marks / 2) * 9;

        // 如果最終的差異不為 0，則 Alice 可以確保和不相等，Alice 獲勝
        return ans != 0;
    }
};
```