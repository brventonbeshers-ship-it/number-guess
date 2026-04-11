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
