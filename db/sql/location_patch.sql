ALTER TABLE whoapp_test.location DROP FOREIGN KEY fk_location_place;
ALTER TABLE whoapp_test.location ADD CONSTRAINT fk_location_place FOREIGN KEY (place_id) REFERENCES whoapp_test.place(id) ON DELETE CASCADE;
ALTER TABLE whoapp_dev.location DROP FOREIGN KEY fk_location_place;
ALTER TABLE whoapp_dev.location ADD CONSTRAINT fk_location_place FOREIGN KEY (place_id) REFERENCES whoapp_test.place(id) ON DELETE CASCADE;