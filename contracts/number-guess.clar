;; Number Guess - on-chain number guessing game
;; Users guess a number from 1 to 100, track total guesses, wins, and leaderboard rank.

(define-data-var total-guesses uint u0)
(define-data-var total-wins uint u0)
(define-map user-guesses principal uint)
(define-map user-wins principal uint)
(define-map user-last-guess principal uint)
(define-map user-last-target principal uint)

(define-data-var leader-1 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-2 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-3 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-4 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-5 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-6 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-7 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-8 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-9 {who: principal, wins: uint} {who: tx-sender, wins: u0})
(define-data-var leader-10 {who: principal, wins: uint} {who: tx-sender, wins: u0})

(define-public (guess (value uint))
  (begin
    (asserts! (and (>= value u1) (<= value u100)) (err u400))
    (let
      (
        (caller tx-sender)
        (current-guesses (default-to u0 (map-get? user-guesses caller)))
        (current-wins (default-to u0 (map-get? user-wins caller)))
        (new-guess-count (+ current-guesses u1))
        (target (+ (mod (+ block-height (var-get total-guesses) (* current-guesses u3)) u100) u1))
        (matched (is-eq value target))
        (new-wins (if matched (+ current-wins u1) current-wins))
      )
      (map-set user-guesses caller new-guess-count)
      (map-set user-wins caller new-wins)
      (map-set user-last-guess caller value)
      (map-set user-last-target caller target)
      (var-set total-guesses (+ (var-get total-guesses) u1))
      (if matched
        (begin
          (var-set total-wins (+ (var-get total-wins) u1))
          (update-leaderboard caller new-wins)
        )
        true
      )
      (ok {
        guess: value,
        target: target,
        matched: matched,
        guesses: new-guess-count,
        wins: new-wins
      })
    )
  )
)

(define-private (update-leaderboard (who principal) (wins uint))
  (begin
    (if (>= wins (get wins (var-get leader-10)))
      (begin
        (var-set leader-10 {who: who, wins: wins})
        (bubble-up-9)
      )
      true
    )
    true
  )
)

(define-private (bubble-up-9)
  (if (>= (get wins (var-get leader-10)) (get wins (var-get leader-9)))
    (let ((tmp (var-get leader-9)))
      (var-set leader-9 (var-get leader-10))
      (var-set leader-10 tmp)
      (bubble-up-8)
    )
    true
  )
)

(define-private (bubble-up-8)
  (if (>= (get wins (var-get leader-9)) (get wins (var-get leader-8)))
    (let ((tmp (var-get leader-8)))
      (var-set leader-8 (var-get leader-9))
      (var-set leader-9 tmp)
      (bubble-up-7)
    )
    true
  )
)

(define-private (bubble-up-7)
  (if (>= (get wins (var-get leader-8)) (get wins (var-get leader-7)))
    (let ((tmp (var-get leader-7)))
      (var-set leader-7 (var-get leader-8))
      (var-set leader-8 tmp)
      (bubble-up-6)
    )
    true
  )
)

(define-private (bubble-up-6)
  (if (>= (get wins (var-get leader-7)) (get wins (var-get leader-6)))
    (let ((tmp (var-get leader-6)))
      (var-set leader-6 (var-get leader-7))
      (var-set leader-7 tmp)
      (bubble-up-5)
    )
    true
  )
)

(define-private (bubble-up-5)
  (if (>= (get wins (var-get leader-6)) (get wins (var-get leader-5)))
    (let ((tmp (var-get leader-5)))
      (var-set leader-5 (var-get leader-6))
      (var-set leader-6 tmp)
      (bubble-up-4)
    )
    true
  )
)

(define-private (bubble-up-4)
  (if (>= (get wins (var-get leader-5)) (get wins (var-get leader-4)))
    (let ((tmp (var-get leader-4)))
      (var-set leader-4 (var-get leader-5))
      (var-set leader-5 tmp)
      (bubble-up-3)
    )
    true
  )
)

(define-private (bubble-up-3)
  (if (>= (get wins (var-get leader-4)) (get wins (var-get leader-3)))
    (let ((tmp (var-get leader-3)))
      (var-set leader-3 (var-get leader-4))
      (var-set leader-4 tmp)
      (bubble-up-2)
    )
    true
  )
)

(define-private (bubble-up-2)
  (if (>= (get wins (var-get leader-3)) (get wins (var-get leader-2)))
    (let ((tmp (var-get leader-2)))
      (var-set leader-2 (var-get leader-3))
      (var-set leader-3 tmp)
      (bubble-up-1)
    )
    true
  )
)

(define-private (bubble-up-1)
  (if (>= (get wins (var-get leader-2)) (get wins (var-get leader-1)))
    (let ((tmp (var-get leader-1)))
      (var-set leader-1 (var-get leader-2))
      (var-set leader-2 tmp)
      true
    )
    true
  )
)

(define-read-only (get-total-guesses)
  (var-get total-guesses)
)

(define-read-only (get-total-wins)
  (var-get total-wins)
)

(define-read-only (get-user-guesses (user principal))
  (default-to u0 (map-get? user-guesses user))
)

(define-read-only (get-user-wins (user principal))
  (default-to u0 (map-get? user-wins user))
)

(define-read-only (get-user-last-guess (user principal))
  (default-to u0 (map-get? user-last-guess user))
)

(define-read-only (get-user-last-target (user principal))
  (default-to u0 (map-get? user-last-target user))
)

(define-read-only (get-leaderboard)
  (list
    (var-get leader-1)
    (var-get leader-2)
    (var-get leader-3)
    (var-get leader-4)
    (var-get leader-5)
    (var-get leader-6)
    (var-get leader-7)
    (var-get leader-8)
    (var-get leader-9)
    (var-get leader-10)
  )
)
;; rep-contract-target: 1775932225244
;; rep-contract-comment: 1776144341773
;; rep-contract-target: 1776144398870
;; rep-contract-target: 1776171387377
;; rep-contract-comment: 1776171446668
;; rep-contract-comment: 1776186902284
;; rep-contract-target: 1776187082748
;; rep-contract-target: 1776248381574
;; rep-contract-comment: 1776248660444
;; rep-contract-target: 1776257035522
;; rep-contract-comment: 1776257272079
;; rep-contract-comment: 1776270345418
;; rep-contract-target: 1776270353841
;; rep-contract-comment: 1776316520834
;; rep-contract-target: 1776316606952
;; rep-contract-comment: 1776331655040
;; rep-contract-target: 1776331893598
;; rep-contract-target: 1776350484793
;; rep-contract-comment: 1776350695010
;; rep-contract-target: 1776373599078
;; rep-contract-target: 1776401768728
;; rep-contract-comment: 1776401824570
;; rep-contract-target: 1776432364477
;; rep-contract-comment: 1776432702331
;; rep-contract-target: 1776461053556
;; rep-contract-comment: 1776461135534
;; rep-contract-target: 1776480652707
;; rep-contract-comment: 1776480779193
;; rep-contract-comment: 1776494645263
;; rep-contract-target: 1776494706512
;; rep-contract-comment: 1776519289849
;; rep-contract-target: 1776519385074
;; rep-contract-target: 1776551056124
;; rep-contract-comment: 1776551061644
;; rep-contract-target: 1776586297524
;; rep-contract-comment: 1776586518290
;; rep-contract-comment: 1776620252790
;; rep-contract-target: 1776620351034
;; rep-contract-comment: 1776645442732
;; rep-contract-target: 1776645511769
;; rep-contract-comment: 1776673250224
;; rep-contract-target: 1776673258722
;; rep-contract-target: 1776680365515
;; rep-contract-comment: 1776680519424
;; rep-contract-target: 1776702493851
;; rep-contract-comment: 1776702512080
;; rep-contract-target: 1776752687271
;; rep-contract-comment: 1776752833202
;; rep-contract-target: 1776781976894
;; rep-contract-comment: 1776782238855
;; rep-contract-comment: 1776805306864
;; rep-contract-target: 1776805412394
;; rep-contract-comment: 1776818332827
;; rep-contract-target: 1776818395967
;; rep-contract-target: 1776835188609
;; rep-contract-comment: 1776835190878
;; rep-contract-target: 1776864179800
;; rep-contract-comment: 1776864370823
;; rep-contract-comment: 1776877532415
;; rep-contract-target: 1776877586602
;; rep-contract-comment: 1776890616029
;; rep-contract-target: 1776890861574
;; rep-contract-comment: 1776939915125
;; rep-contract-target: 1776939962752
;; rep-contract-target: 1776963332233
;; rep-contract-comment: 1776963378973
;; rep-contract-target: 1777002469835
;; rep-contract-comment: 1777002597638
;; rep-contract-comment: 1777025776154
;; rep-contract-target: 1777025980707
