import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface ColumnsProps {
    columns: number;
    gap: number;
}

const Columns: React.FC<PropsWithChildren<ColumnsProps>> = ({ children, columns, gap }) => {
    // normalize to array so we can split it up
    let items: React.ReactNode[] = Array.isArray(children) ? children : [children];

    // break items into chunks of size `columns`
    const rows: React.ReactNode[][] = [];
    for (let i = 0; i < items.length; i += columns) {
        rows.push(items.slice(i, i + columns));
    }

    return (
        <View style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: gap }}>
            {rows.map((row, rowIndex) => (
                <View
                    key={rowIndex}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: gap,
                        width: '100%',
                    }}
                >
                    {row.map((child, idx) => (
                        <View key={idx} style={{ width: `${100 / columns}%` }}>
                            {child}
                        </View>
                    ))}
                    {row.length < columns
                        ? Array.from({ length: columns - row.length }).map((_, i) => (
                              <View key={i} style={{ flex: 1 }} />
                          ))
                        : null}
                </View>
            ))}
        </View>
    );
};

Columns.displayName = 'columns';

export default Columns;
