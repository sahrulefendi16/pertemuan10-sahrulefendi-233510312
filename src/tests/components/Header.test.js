// src/tests/components/Header.test.js
import { describe, it, expect, beforeEach } from 'vitest'; // Added beforeEach
import { mount } from '@vue/test-utils';
import Header from '../../components/Header.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';

describe('Header.vue', () => { // <--- This is the missing piece (or incorrectly placed)
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders site title correctly', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [
          createRouter({
            history: createWebHistory(),
            routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
          }),
        ],
      },
    });
    expect(wrapper.find('h1').text()).toBe('Web UKM UIR');
  });

  it('renders navigation links', async () => { // Added async
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
        { path: '/ukm', name: 'ukm-list', component: { template: '<div>UKM List</div>' } }, // Add UKM route for testing
      ],
    });
    await router.push('/'); // Use await
    await router.isReady(); // Use await

    const wrapper = mount(Header, {
      global: {
        plugins: [router],
      },
    });

    const links = wrapper.findAll('nav a');
    expect(links.length).toBeGreaterThan(0);
    // Adjust these expectations based on your actual Header.vue template's links
    expect(links[0].text()).toBe('Beranda');
    expect(links[0].attributes('href')).toBe('/');
    expect(links[1].text()).toBe('UKM'); // Assuming you have a link to /ukm
    expect(links[1].attributes('href')).toBe('/ukm');
  });
});