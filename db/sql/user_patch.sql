ALTER TABLE whoapp_test.user ADD COLUMN salt VARCHAR(50) after password;
ALTER TABLE whoapp_dev.user ADD COLUMN salt VARCHAR(50) after password;