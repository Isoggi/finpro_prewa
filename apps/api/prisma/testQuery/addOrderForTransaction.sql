USE finpro_prwa;

-- Start the transaction
START TRANSACTION;

-- First transaction
INSERT INTO transactions (user_id, amount, payment_method, status, updated_at)
VALUES (4, 350000, 'manual', 'pending', NOW());

-- Check if the last insert was successful
SET @last_id_in_transaction = LAST_INSERT_ID();

-- Insert into transaction_items
INSERT INTO transaction_items (transaction_id, room_id, start_date, end_date, total_price, status, updated_at)
VALUES (@last_id_in_transaction, 1, DATE_ADD(NOW(), INTERVAL 1 MONTH), DATE_ADD(DATE_ADD(NOW(), INTERVAL 1 DAY), INTERVAL 1 MONTH), 350000, 'waitingpayment', NOW());

-- If everything is fine, commit the transaction
COMMIT;

-- If there is any error, rollback the entire transaction
ROLLBACK;
