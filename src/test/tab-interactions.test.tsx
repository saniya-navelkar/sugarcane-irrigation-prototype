import { useState } from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { plots, irrigationHistory } from '@/data/mockData';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { HelpScreen } from '@/screens/HelpScreen';
import { HistoryScreen } from '@/screens/HistoryScreen';
import { MyPlotsScreen } from '@/screens/MyPlotsScreen';

vi.mock('@/context/AppContext', () => ({
  useApp: () => {
    const [selectedPlotId, setSelectedPlotId] = useState('04');
    return { selectedPlotId, setSelectedPlotId, navigate: vi.fn(), showToast: vi.fn(), irrigationMinutes: 45, setIrrigationMinutes: vi.fn(), records: irrigationHistory };
  },
}));

afterEach(cleanup);

describe('Prototype content switching', () => {
  it.each(plots)('opens field data for Plot $id on the dashboard', (plot) => {
    render(<DashboardScreen />);
    const button = within(screen.getByRole('group', { name: 'Field selection' })).getByRole('button', { name: `Plot ${plot.id} ${plot.moisture}%` });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('region', { name: plot.name })).toBeVisible();
    expect(within(screen.getByRole('region', { name: plot.name })).getByText(`${plot.moisture}% moisture · ${plot.stage}`)).toBeVisible();
  });

  it.each(['Sensor care', 'Irrigation safety', 'Crop guidance'])('switches the Help guide to %s', (guide) => {
    render(<HelpScreen />);
    fireEvent.click(screen.getByRole('tab', { name: guide }));
    const panel = screen.getByRole('tabpanel', { name: guide });
    expect(panel).toBeVisible();
    expect(within(panel).getAllByRole('listitem')).toHaveLength(3);
  });

  it.each(['01', '02', '03', '04'])('filters history records for Plot %s', (id) => {
    render(<HistoryScreen />);
    fireEvent.click(within(screen.getByRole('group', { name: 'Filter history by plot' })).getByRole('button', { name: `Plot ${id}` }));
    const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    expect(rows).toHaveLength(irrigationHistory.filter(r => r.plotName === `Plot ${id}`).length);
    for (const row of rows) expect(within(row).getAllByRole('cell')[1]).toHaveTextContent(`Plot ${id}`);
  });

  it.each([['Healthy', 2], ['Monitor', 1], ['Critical', 1], ['All plots', 4]] as const)('filters plots by %s', (filter, count) => {
    render(<MyPlotsScreen />);
    fireEvent.click(within(screen.getByRole('group', { name: 'Plot status filter' })).getByRole('button', { name: filter }));
    expect(screen.getAllByRole('article')).toHaveLength(count);
  });
});