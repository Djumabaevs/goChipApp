<RNPickerSelect
        placeholder={{
          label: 'Pet Details...',
          value: null,
          color: '#0063FF',
        }}
             style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 10,
              },
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Guardian Details', value: 'Guardian Details', color: '#0063FF' },
                { label: 'Vet Details', value: 'Vet Details',color: '#0063FF' },
                { label: 'Insurance', value: 'Insurance',color: '#0063FF' },
                { label: 'City License', value: 'CIty License',color: '#0063FF' },
                { label: 'Breeder', value: 'Breeder',color: '#0063FF' },
                { label: 'Identifier', value: 'Identifier',color: '#0063FF' }
            ]}
            // Icon={() => {
            //   return <Chevron size={1.5} color="gray" />;
            // }}
            Icon={() => {
              return (
                <View
                  style={{
                    backgroundColor: 'transparent',
                    borderTopWidth: 10,
                    borderTopColor: '#0063FF',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    width: 0,
                    height: 0,
                  }}
                />
              );
            }}
            useNativeAndroidPickerStyle={false}
           // textInputProps={{ underlineColorAndroid: '#0063FF' }}
        />