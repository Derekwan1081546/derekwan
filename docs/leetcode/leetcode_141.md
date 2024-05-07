
# Leetcode-141. Linked List Cycle
## 題目說明
給定 `linked list` 的頭 `head`，判斷鍊錶中是否有環(`cycle`)。

如果 `linked list` 中存在可以透過連續跟隨下一個指標再次到達的某個節點，則 `linked list` 中存在循環。在內部， `pos` 用於表示 `tail` 的 `next` 指標所連接的節點的索引。請注意，`pos` 不作為參數傳遞。

如果 `linked list` 中存在循環，則傳回 `true` 。否則，返回 `false`。
### 限制條件：
- list中節點的數量在 `[0, 104]` 範圍內。
- `-10^5 <= Node.val <= 10^5`
- `pos` 是 `-1` 或`linked list`中的有效索引。

## 解題思路
是使用兩個指針來檢查環。一個快指針每次移動兩步，一個慢指針每次移動一步。如果鏈表有環，快指針最終會追上慢指針。這種方法稱為「龜兔賽跑」算法（`Floyd's Cycle Detection Algorithm`）。這個方法不需要使用額外的資料結構來存儲訪問過的節點，因此空間複雜度更低。它只需檢查指針是否相遇來判斷是否存在環，時間複雜度為 `O(n)`。
## 參考解法
```cpp title="C++ " showLineNumbers
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;       // 慢指針每次移動一步
            fast = fast->next->next; // 快指針每次移動兩步

            if (slow == fast) { // 如果兩個指針相遇，表示有環
                return true;
            }
        }

        return false; // 如果快指針到達終點，表示沒有環
    }
};
```