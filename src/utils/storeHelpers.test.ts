import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildInquiryWhatsAppMessage,
  buildTelUrl,
  buildWhatsAppUrl,
  filterGalleryItems,
  getStoreOpenStatus,
  sanitizePhoneDigits,
  validateInquiryForm,
} from './storeHelpers';
import { businessConfig } from '../config/business';

test('sanitizePhoneDigits removes spaces, dashes, and plus signs', () => {
  assert.equal(sanitizePhoneDigits('+91 98350-12345'), '919835012345');
  assert.equal(sanitizePhoneDigits('98765 43210'), '9876543210');
});

test('buildTelUrl formats tel links cleanly', () => {
  assert.equal(buildTelUrl('+91 98350 00000'), 'tel:+919835000000');
  assert.equal(buildTelUrl('9876543210'), 'tel:9876543210');
  assert.equal(buildTelUrl(''), '#contact');
});

test('buildWhatsAppUrl prefixes India country code on 10-digit numbers and encodes text', () => {
  const url = buildWhatsAppUrl('9876543210', 'Hello Maa Mobile Center!');
  assert.equal(
    url,
    'https://wa.me/919876543210?text=Hello%20Maa%20Mobile%20Center!'
  );

  const urlWithCountry = buildWhatsAppUrl('+91 98350 00000', 'Check Apple stock');
  assert.equal(
    urlWithCountry,
    'https://wa.me/919835000000?text=Check%20Apple%20stock'
  );
});

test('getStoreOpenStatus returns Open Now during Monday business hours and Currently Closed after hours', () => {
  // Monday 14:30 local time (2026-11-23 is a Monday)
  const openDate = new Date(2026, 10, 23, 14, 30);
  const openStatus = getStoreOpenStatus(businessConfig.openingHours, openDate);
  assert.equal(openStatus.isOpen, true);
  assert.equal(openStatus.label, 'Open Now');
  assert.equal(openStatus.currentDay, 'Monday');

  // Monday 21:30 local time (after 21:00 closing)
  const closedDate = new Date(2026, 10, 23, 21, 30);
  const closedStatus = getStoreOpenStatus(businessConfig.openingHours, closedDate);
  assert.equal(closedStatus.isOpen, false);
  assert.equal(closedStatus.label, 'Currently Closed');
});

test('filterGalleryItems returns all items for All and narrows cleanly for specific categories', () => {
  const all = filterGalleryItems(businessConfig.gallery, 'All');
  assert.equal(all.length, businessConfig.gallery.length);

  const accessories = filterGalleryItems(businessConfig.gallery, 'Accessories');
  assert.equal(accessories.length, 1);
  assert.equal(accessories[0].category, 'Accessories');
});

test('validateInquiryForm rejects empty or invalid fields and accepts valid Indian mobile inquiries', () => {
  const invalid = validateInquiryForm({
    name: 'A',
    phone: '12345',
    topic: '',
    message: 'Hi',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.topic);
  assert.ok(invalid.errors.message);

  const valid = validateInquiryForm({
    name: 'Priya Sharma',
    phone: '9876543210',
    topic: 'New Mobile Phones',
    message: 'Looking for Samsung Galaxy A series availability.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});

  const msg = buildInquiryWhatsAppMessage({
    name: 'Priya Sharma',
    phone: '9876543210',
    topic: 'New Mobile Phones',
    message: 'Looking for Samsung Galaxy A series availability.',
  });
  assert.match(msg, /Priya Sharma/);
  assert.match(msg, /New Mobile Phones/);
});
