// src/tests/components/UKMCard.test.js
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UKMCard from '../../components/UKMCard.vue';
import { createRouter, createWebHistory } from 'vue-router'; // Needed if UKMCard uses <router-link>

describe('UKMCard.vue', () => {
  it('renders UKM details correctly and a link to its detail page', async () => {
    const mockUkm = {
      id: 1,
      name: 'UKM Olahraga',
      description: 'Unit kegiatan mahasiswa yang berfokus pada pengembangan bakat di bidang olahraga.',
    };

    // Mock Vue Router for the <router-link>
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/ukm/:id', name: 'ukm-detail', component: { template: '<div>UKM Detail</div>' } },
      ],
    });
    // Push an arbitrary route to initialize router, though not strictly necessary for this test
    await router.push('/');
    await router.isReady();

    const wrapper = mount(UKMCard, {
      props: {
        ukm: mockUkm,
      },
      global: {
        plugins: [router], // Register the mocked router
      },
    });

    expect(wrapper.find('h3').text()).toBe(mockUkm.name);
    expect(wrapper.find('p').text()).toContain(mockUkm.description.substring(0, 100)); // Checks part of description
    
    const detailLink = wrapper.find('a');
    expect(detailLink.exists()).toBe(true);
    expect(detailLink.text()).toBe('Lihat Detail');
    expect(detailLink.attributes('href')).toBe(`/ukm/${mockUkm.id}`);
  });
});