import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { MapPin } from 'lucide-react-native';

  const data = [
    { label: 'Full Time', value: '1' },
    { label: 'Part Time', value: '2' },
    { label: 'Remote', value: '3' },
  ];

  const DropdownComponent = ({name}:any) => {
    const [value, setValue] = useState(null);

    const renderItem = (item:any) => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={name}
        value={value}
        onChange={(item:any) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          <MapPin size={20} color="#6B7280" />
        )}
        renderItem={renderItem}
      />
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    dropdown: {
    //   margin: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 0.2,
      // shadowRadius: 1.41,

      // elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });