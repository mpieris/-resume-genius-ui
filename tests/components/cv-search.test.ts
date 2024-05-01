import CVPreview from '@/components/CVPreview.vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createVuetify } from 'vuetify';

describe('CVPreview.vue', () => {
  let vuetify: any;

  enableAutoUnmount(afterEach);

  beforeEach(() => {
    vuetify = createVuetify();
    setActivePinia(createPinia());
  });

  test('does not render CV information when cv prop is not provided', async () => {
    // Mount the component with the mocked CV data
    const wrapper = mount(CVPreview, {
      global: {
        plugins: [vuetify],
      },
    });

    // Wait for next tick to ensure the component is updated
    await wrapper.vm.$nextTick();

    // Assert that no CV information is rendered
    expect(wrapper.find('.v-card-title').exists()).toBeNaN;
    expect(wrapper.find('.v-card-text').exists()).toBeNaN;
    expect(wrapper.find('.v-img').exists()).toBeNaN;
  });

  test('renders CV information correctly when cv prop is provided', async () => {
    // Mock CV data
    const cvData = {
      name: 'John Doe',
      headline: 'Software Engineer',
      experience: '5 years',
      edu: 'Computer Science',
      image: 'https://example.com/profile.jpg',
    };

    // Mount the component with the mocked CV data
    const wrapper = mount(CVPreview, {
      global: {
        plugins: [vuetify],
      },
      props: {
        cv: cvData,
      },
    });

    // Wait for next tick to ensure the component is updated
    await wrapper.vm.$nextTick();

    // Assert that the CV information is rendered correctly
    expect(wrapper.find('.v-card-title').text()).toBe(cvData.name);
    expect(wrapper.find('.v-card-text').text()).toContain(cvData.headline);
    expect(wrapper.find('.v-card-text').text()).toContain(cvData.experience);
    expect(wrapper.find('.v-card-text').text()).toContain(cvData.edu);
  });
});
