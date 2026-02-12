
# Leetcode-148. Sort List
## 題目說明
給定 `linked list` 的頭 `head`，傳回按升序排序後的`linked list`。
### 限制條件：
- 清單中的節點數量在 `[0, 5 * 10^4]` 範圍內。

- `-10^5 <= Node.val <= 10^5`。

## 解題思路

這題的目標是對一個 **單向鏈結串列 (Singly Linked List)** 進行排序，且通常要求時間複雜度為 $O(N \log N)$。
最適合鏈結串列的排序演算法是 **歸併排序 (Merge Sort)**。與陣列不同，鏈結串列不支援隨機存取（Random Access），因此快速排序 (Quick Sort) 效率較差且實作複雜；而歸併排序僅需調整指針，不需要額外的陣列空間來搬移資料。



我們可以將過程分為三個主要步驟：

1.  **尋找中點與分割 (Find Middle & Split)**：
    * 使用 **快慢指標 (Fast & Slow Pointers)** 技巧。快指標一次走兩步，慢指標一次走一步。
    * 當快指標走到終點時，慢指標剛好位於中點。
    * **關鍵操作**：必須記錄慢指標的前一個節點 (`prev`)，並將 `prev->next` 設為 `nullptr`，這樣才能將串列物理上切斷成兩個獨立的子串列。

2.  **遞迴排序 (Recursion)**：
    * 對切分出來的左半部 (`head`) 和右半部 (`slow`) 分別遞迴呼叫 `sortList`。
    * 遞迴的終止條件是節點為空 (`nullptr`) 或只有一個節點 (`!head->next`)，此時視為已排序。

3.  **合併 (Merge)**：
    * 將兩個已排序的子串列 (`l1`, `l2`) 合併成一個有序串列。
    * 使用一個 **虛擬頭節點 (Dummy Node)** 來簡化邊界處理（不需要判斷頭節點是否為空）。
    * 比較 `l1` 和 `l2` 的值，將較小的節點接在 `curr->next` 之後，直到其中一條串列走完，再將剩餘的部分直接接上。

---

### 複雜度分析

* **時間複雜度：$O(N \log N)$**
    * 分割過程類似二分法，遞迴深度為 $\log N$。
    * 每一層的合併操作 (Merge) 需要遍歷所有節點，花費 $O(N)$。
    * 總時間複雜度為 $O(N \log N)$。

* **空間複雜度：$O(\log N)$**
    * 雖然我們沒有申請額外的陣列空間（如陣列歸併排序需要的 $O(N)$），但遞迴呼叫會佔用 **系統堆疊 (System Stack)**。
    * 由於遞迴深度為 $\log N$，因此空間複雜度為 $O(\log N)$。
## 參考解法
```cpp title="C++ " showLineNumbers
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        // 基礎情況：如果串列為空或只有一個節點，不需排序
        if (!head || !head->next) return head;

        // 1. 使用快慢指標找中點
        ListNode* prev = nullptr;
        ListNode* slow = head;
        ListNode* fast = head;
        
        while (fast && fast->next) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        
        // 2. 切斷串列，分為兩半：head 到 prev，以及 slow 到最後
        prev->next = nullptr; 

        // 3. 遞迴排序兩半
        ListNode* l1 = sortList(head);
        ListNode* l2 = sortList(slow);

        // 4. 合併
        return merge(l1, l2);
    }

private:
    ListNode* merge(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); // 虛擬頭節點，簡化邏輯
        ListNode* curr = &dummy;

        while (l1 && l2) {
            if (l1->val < l2->val) {
                curr->next = l1;
                l1 = l1->next;
            } else {
                curr->next = l2;
                l2 = l2->next;
            }
            curr = curr->next;
        }

        // 如果其中一個串列還有剩，直接接上去
        if (l1) curr->next = l1;
        if (l2) curr->next = l2;

        return dummy.next;
    }
};
```